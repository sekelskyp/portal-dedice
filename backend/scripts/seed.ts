import { sql } from 'drizzle-orm'
import { MySql2Database } from 'drizzle-orm/mysql2'

import { getConnection } from '../src/db/db'
import {
  asset,
  beneficiary,
  beneficiaryInheritanceProcedureRel,
  contact,
  inheritanceProcedure,
  notary,
  notaryDateRule,
  user,
} from '../src/db/schema'
import { hashPassword } from '../src/services/passwordHashService'

import { seedInheritanceProcedures } from './seedInheritanceProcedures'
import { seedNotariesAndDateRules } from './seedNotaries'

async function populateDatabase(
  db: MySql2Database<typeof import('../src/db/schema')>,
  notaryIds: number[]
) {
  console.log('Seeding population data...')

  // Insert contacts and save returned IDs
  const [beneficiaryContactId1, beneficiaryContactId2, deceasedContactId1] =
    await db
      .insert(contact)
      .values([
        {
          name: 'Young',
          surname: 'Gatchell',
          displayName: 'Young Gatchell',
          gender: 'Male',
          phone: '+420666666661',
          email: 'gatyou@quacker.com',
          completeAddress: 'Main Street 123, Brno, Czech Republic',
          postalCode: '11000',
        },
        {
          name: 'Petr',
          surname: 'Hochman',
          displayName: 'Petr Hochman',
          gender: 'Male',
          phone: '+420555555551',
          email: 'hocpet@quacker.com',
          completeAddress: 'Main Street 456, Brno, Czech Republic',
          postalCode: '15000',
        },
        {
          name: 'Alice',
          surname: 'Novakova',
          displayName: 'Alice Novakova',
          gender: 'Female',
          phone: '+420444444441',
          email: 'novali@quacker.com',
          completeAddress: 'Liberty Avenue 789, Prague, Czech Republic',
          postalCode: '12000',
        },
        {
          name: 'Tomas',
          surname: 'Vesely',
          displayName: 'Tomas Vesely',
          gender: 'Male',
          phone: '+420333333331',
          email: 'vestom@quacker.com',
          completeAddress: 'Peace Square 321, Ostrava, Czech Republic',
          postalCode: '13000',
        },
      ])
      .$returningId()

  // Insert users and save returned IDs
  const [beneficiaryUserId1, beneficiaryUserId2] = await db
    .insert(user)
    .values([
      {
        password: await hashPassword('heslo1234'),
        email: 'test.email1@email.com',
      },
      {
        password: await hashPassword('heslo1234'),
        email: 'test.email2@email.com',
      },
    ])
    .$returningId()

  // Insert beneficiaries using the saved beneficiaryUserId
  await db
    .insert(beneficiary)
    .values([
      {
        userId: beneficiaryUserId1.id,
        contactId: beneficiaryContactId1.id,
        deceasedRelation: 'Spouse',
        dateOfBirth: new Date('1980-01-01'),
      },
      {
        userId: beneficiaryUserId2.id,
        contactId: beneficiaryContactId2.id,
        deceasedRelation: 'Child',
        dateOfBirth: new Date('1980-01-01'),
      },
    ])
    .onDuplicateKeyUpdate({ set: { userId: beneficiaryUserId2.id } })

  const [inheritanceId1] = await seedInheritanceProcedures(db, [
    {
      notaryId: notaryIds[0],
      mainBeneficiaryId: beneficiaryUserId1.id,
      state: 'InProgress',
      startDate: new Date('2024-01-01'),
      deceasedContactId: deceasedContactId1.id,
      deceasedDateOfBirth: new Date('1940-01-01'),
      deceasedDateOfDeath: new Date('2023-12-31'),
    },
  ])

  await db.insert(beneficiaryInheritanceProcedureRel).values([
    {
      beneficiaryId: beneficiaryUserId1.id,
      inheritanceProcedureId: inheritanceId1,
    },
    {
      beneficiaryId: beneficiaryUserId2.id,
      inheritanceProcedureId: inheritanceId1,
    },
  ])

  await db.insert(asset).values([
    {
      inheritanceProcedureId: inheritanceId1,

      value: 100_000,
      name: 'Auto',
    },
    {
      inheritanceProcedureId: inheritanceId1,

      value: 200_000,
      name: 'Dům',
    },
  ])
  console.log('Population data seeded successfully.')
}

async function seed() {
  const connection = await getConnection()
  const db = connection.db

  try {
    // Disable foreign key checks
    await db.execute(sql`SET FOREIGN_KEY_CHECKS = 0;`)

    // delete previous data (idk if we really need this when we have DB in docker and can just remove the volume and start fresh)
    await db.delete(beneficiary)
    await db.delete(notary)
    await db.delete(user)
    await db.delete(contact)
    await db.delete(notaryDateRule)
    await db.delete(inheritanceProcedure)
    await db.delete(beneficiaryInheritanceProcedureRel)
    await db.delete(asset)
    const { notaryIds } = await seedNotariesAndDateRules(db)
    await populateDatabase(db, notaryIds)
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    // Enable foreign key checks
    await db.execute(sql`SET FOREIGN_KEY_CHECKS = 1;`)
    await connection.connection.end() // Ensure the connection is closed after seeding
    process.exit(0)
  }
}

seed().catch((err) => {
  console.error('Error in seed function:', err)
  process.exit(1)
})

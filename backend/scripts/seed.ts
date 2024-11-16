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
  const [
    beneficiaryContactId1,
    beneficiaryContactId2,
    deceasedContactId1,
    beneficiaryContactId3,
    deceasedContactId2,
    notaryContactId1,
    notaryContactId2,
  ] = await db
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
      {
        name: 'Jan',
        surname: 'Svoboda',
        displayName: 'Jan Svoboda',
        gender: 'Male',
        phone: '+42033333333š',
        email: 'svojan@quacker.com',
        completeAddress: 'Peace Square 321, Ostrava, Czech Republic',
        postalCode: '13000',
      },
      // main Contacts for inheritance procedures
      {
        name: 'Jan',
        surname: 'Michalec',
        displayName: 'Jan Michalec',
        gender: 'Male',
        phone: '+42033333333š',
        email: 'michalec@quacker.com',
        completeAddress: 'Peace Square 321, Ostrava, Czech Republic',
        postalCode: '13000',
      },
      {
        name: 'Petr',
        surname: 'Hochman',
        displayName: 'Petr Hochman',
        gender: 'Male',
        phone: '+42033333333š',
        email: 'hochman@quacker.com',
        completeAddress: 'Peace Square 321, Ostrava, Czech Republic',
        postalCode: '13000',
      },
    ])
    .$returningId()

  // Insert users and save returned IDs
  const [beneficiaryUserId1, beneficiaryUserId2, beneficiaryUserId3] = await db
    .insert(user)
    .values([
      {
        password: await hashPassword('heslo1234'),
        email: 'test.email1@email.com',
        confirmed: true,
      },
      {
        password: await hashPassword('heslo1234'),
        email: 'test.email2@email.com',
        confirmed: true,
      },
      {
        password: await hashPassword('heslo1234'),
        email: 'test.email3@email.com',
        confirmed: true,
      },
    ])
    .$returningId()

  // Insert beneficiaries using the saved beneficiaryUserId
  const [beneficiaryId1, beneficiaryId2, beneficiaryId3] = await db
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
      {
        userId: beneficiaryUserId3.id,
        contactId: beneficiaryContactId3.id,
        deceasedRelation: 'Parent',
        dateOfBirth: new Date('1990-01-01'),
      },
    ])
    .onDuplicateKeyUpdate({ set: { userId: beneficiaryUserId2.id } })
    .$returningId()

  // populate user notaries
  const [notaryUserId1, notaryUserId2] = await db
    .insert(user)
    .values([
      {
        email: 'test.notary1@quacker.cz',
        password: await hashPassword('heslo1234'),
        confirmed: true,
      },
      {
        email: 'test.notary2@quacker.cz',
        password: await hashPassword('heslo1234'),
        confirmed: true,
      },
    ])
    .$returningId()

  const [notaryId1, notaryId2] = await db
    .insert(notary)
    .values([
      {
        contactId: notaryContactId1.id,
        userId: notaryUserId1.id,
      },
      {
        contactId: notaryContactId2.id,
        userId: notaryUserId2.id,
      },
    ])
    .$returningId()

  const [inheritanceId1, inheritanceId2] = await seedInheritanceProcedures(db, [
    {
      notaryId: notaryId1.id,
      state: 'InProgress',
      startDate: new Date('2024-01-01'),
      deceasedContactId: deceasedContactId1.id,
      deceasedDateOfBirth: new Date('1940-01-01'),
      deceasedDateOfDeath: new Date('2023-12-31'),
      mainContactId: beneficiaryContactId1.id,
    },
    {
      notaryId: notaryId2.id,
      state: 'InProgress',
      startDate: new Date('2024-03-10'),
      deceasedContactId: deceasedContactId2.id,
      deceasedDateOfBirth: new Date('1956-12-01'),
      deceasedDateOfDeath: new Date('2024-03-12'),
      mainContactId: beneficiaryContactId3.id,
    },
  ])

  await db.insert(beneficiaryInheritanceProcedureRel).values([
    {
      beneficiaryId: beneficiaryId1.id,
      inheritanceProcedureId: inheritanceId1,
    },
    {
      beneficiaryId: beneficiaryId2.id,
      inheritanceProcedureId: inheritanceId1,
    },
    {
      beneficiaryId: beneficiaryId3.id,
      inheritanceProcedureId: inheritanceId2,
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

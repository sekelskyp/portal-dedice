import { MySql2Database } from 'drizzle-orm/mysql2'

import { getConnection } from '../src/db/db'
import {
  beneficiary,
  contact,
  deceasedPerson,
  notary,
  notaryDateRule,
  user,
} from '../src/db/schema'
import { hashPassword } from '../src/services/passwordHashService'

import { seedNotariesAndDateRules } from './seedNotaries'

async function populateDatabase(
  db: MySql2Database<typeof import('../src/db/schema')>
) {
  console.log('Seeding population data...')

  // Insert contacts and save returned IDs
  const [
    beneficiaryContactId1,
    beneficiaryContactId2,
    deceasedPersonContactId1,
    deceasedPersonContactId2,
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

  // Insert deceased persons
  await db.insert(deceasedPerson).values([
    {
      dateOfBirth: new Date('1980-01-01'),
      dateOfDeath: new Date('2000-01-01'),
      contactId: deceasedPersonContactId1.id,
    },
    {
      dateOfBirth: new Date('1980-01-01'),
      dateOfDeath: new Date('2000-01-01'),
      contactId: deceasedPersonContactId2.id,
    },
  ])
  console.log('Population data seeded successfully.')
}

async function seed() {
  const connection = await getConnection()
  const db = connection.db

  try {
    // delete previous data (idk if we really need this when we have DB in docker and can just remove the volume and start fresh)
    await db.delete(beneficiary)
    await db.delete(notary)
    await db.delete(deceasedPerson)
    await db.delete(user)
    await db.delete(contact)
    await db.delete(notaryDateRule)
    await seedNotariesAndDateRules(db)
    await populateDatabase(db)
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    await connection.connection.end() // Ensure the connection is closed after seeding
    process.exit(0)
  }
}

seed().catch((err) => {
  console.error('Error in seed function:', err)
  process.exit(1)
})

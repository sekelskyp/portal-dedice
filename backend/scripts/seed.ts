import { MySql2Database } from 'drizzle-orm/mysql2'

import { getConnection } from '../src/db/db'
import { beneficiary, contact, user } from '../src/db/schema'
import { hashPassword } from '../src/services/passwordHashService'

import { seedNotariesAndDateRules } from './seedNotaries'

async function seedPopulationData(
  db: MySql2Database<typeof import('../src/db/schema')>
) {
  console.log('Seeding population data...')

  // Insert contacts and save returned IDs
  const [beneficiaryContactId1, beneficiaryContactId2] = await db
    .insert(contact)
    .values([
      {
        name: 'Young',
        surname: 'Gatchell',
        dateOfBirth: new Date('1990-01-01'),
        gender: 'Male',
        phone: '+420666666661',
        email: 'gatyou@quacker.com',
        country: 'Czech Republic',
        city: 'Prague',
        street: 'Main Street 123',
        postalCode: '11000',
      },
      {
        name: 'Petr',
        surname: 'Hochman',
        dateOfBirth: new Date('1990-01-01'),
        gender: 'Male',
        phone: '+420555555551',
        email: 'hocpet@quacker.com',
        country: 'Czech Republic',
        city: 'Brno',
        street: 'Secondary Street 456',
        postalCode: '15000',
      },
    ])
    .$returningId()

  // Insert users and save returned IDs
  const [beneficiaryUserId1, beneficiaryUserId2] = await db
    .insert(user)
    .values([
      {
        contactId: beneficiaryContactId1.id,
        password: await hashPassword('heaslo123456b!'),
        login: 'gatyou',
      },
      {
        contactId: beneficiaryContactId2.id,
        password: await hashPassword('heaslo123456b!'),
        login: 'hocpet',
      },
    ])
    .$returningId()

  // Insert beneficiaries using the saved beneficiaryUserId
  await db
    .insert(beneficiary)
    .values([
      {
        userId: beneficiaryUserId1.id,
        deceasedRelation: 'Spouse',
      },
      {
        userId: beneficiaryUserId2.id,
        deceasedRelation: 'Child',
      },
    ])
    .onDuplicateKeyUpdate({ set: { userId: beneficiaryUserId2.id } })

  console.log('Population data seeded successfully.')
}

async function seed() {
  const connection = await getConnection()
  const db = connection.db

  try {
    await seedNotariesAndDateRules(db)
    await seedPopulationData(db)
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

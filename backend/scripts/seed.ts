import * as argon2 from 'argon2'

import { getConnection } from '../src/db/db'
import {
  beneficiary,
  beneficiaryDeceasedRelation,
  contact,
  notary,
  user,
} from '../src/db/schema'

async function seed() {
  console.log('Starting seed function')
  const connection = await getConnection()
  const db = connection.db
  console.log('Database connection established')

  try {

    await db.delete(beneficiary)
    await db.delete(notary)

    await db.delete(user)
    await db.delete(contact)
    await db.delete(beneficiaryDeceasedRelation)

    await db.insert(contact).values([
      {
        id: 1,
        name: 'Young',
        surname: 'Gatchell',
        dateOfBirth: new Date('1990-01-01'),
        gender: 'Male',
        phone: '+420666666661',
        email: 'gatyou@quacker.com',
      },
      {
        id: 2,
        name: 'Petr',
        surname: 'Hochman',
        dateOfBirth: new Date('1990-01-01'),
        gender: 'Male',
        phone: '+420555555551',
        email: 'hocpet@quacker.com',
      },
      {
        id: 3,
        name: 'Petr',
        surname: 'Hochman',
        dateOfBirth: new Date('1990-01-01'),
        gender: 'Male',
        phone: '+420555555552',
        email: 'hocpet@mail.com',
      },
    ])

    await db.insert(user).values([
      {
        id: 1,
        contactId: 1,
        password: await argon2.hash('heaslo123456b!'),
        login: 'gatyou',
      },
      {
        id: 2,
        contactId: 2,
        password: await argon2.hash('heaslo123456b!'),
        login: 'hocpet',
      },
      {
        id: 3,
        contactId: 3,
        password: await argon2.hash('heaslo123456b!'),
        login: 'hocpet_professional',
      },
    ])

    await db.insert(notary).values([
      {
        id: 1,
        businessContactId: 3,
        userId: 2,
      },
    ])

    await db.insert(beneficiaryDeceasedRelation).values([
      {
        id: 1,
        familyRelation: 'Nejaka rodinna vazba',
      },
    ])

    await db.insert(beneficiary).values([
      {
        id: 1,
        userId: 1,
        deceasedRelationId: 1,
      },
    ])

    console.log('Seed function completed')
  } finally {
    await connection.connection.end()
  }
}

seed().catch((err) => {
  console.error('Error in seed function:', err)
  process.exit(1)
})

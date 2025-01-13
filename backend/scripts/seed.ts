import { eq, sql } from 'drizzle-orm'
import { MySql2Database } from 'drizzle-orm/mysql2'

import { getConnection } from '../src/db/db'
import {
  address,
  asset,
  beneficiary,
  chat,
  chatMessage,
  notary,
  notaryDateRule,
  proceeding,
  user,
} from '../src/db/schema'
import { generateProceedingName } from '../src/graphql/modules/proceeding/proceedingService'
import { hashPassword } from '../src/services/passwordHashService'

import { seedNotariesAndDateRules } from './seedNotaries'

async function populateDatabase(
  db: MySql2Database<typeof import('../src/db/schema')>,
  notaryIds: number[]
) {
  console.log('Seeding population data...')
  // insert test notaries
  const [notaryId1, notaryId2] = await db
    .insert(notary)
    .values([{ postalCode: '15000' }, { postalCode: '12000' }])
    .$returningId()

  // addresses for users
  const [
    addressId1,
    addressId2,
    addressId3,
    addressId4,
    addressId5,
    addressId6,
    deceasedAddressId1,
    deceasedAddressId2,
  ] = await db
    .insert(address)
    .values([
      // user addresses
      {
        street: 'Main Street',
        streetNumber: '123',
        municipality: 'Brno',
        postalCode: '11000',
      },
      {
        street: 'Main Street',
        streetNumber: '456',
        municipality: 'Brno',
        postalCode: '15000',
      },
      {
        street: 'Liberty Avenue',
        streetNumber: '789',
        municipality: 'Prague',
        postalCode: '12000',
      },
      {
        street: 'Liberty Avenue',
        streetNumber: '987',
        municipality: 'Prague',
        postalCode: '15000',
      },
      {
        street: 'Liberty Avenue',
        streetNumber: '111',
        municipality: 'Prague',
        postalCode: '13000',
      },
      // notary addresses
      {
        street: 'Peace Square',
        streetNumber: '321',
        municipality: 'Ostrava',
        postalCode: '13000',
      },
      {
        street: 'Peace Square',
        streetNumber: '321',
        municipality: 'Ostrava',
        postalCode: '13000',
      },
      // deceased addresses
      {
        street: 'Main Street',
        streetNumber: '888',
        municipality: 'Brno',
        postalCode: '11000',
      },
      {
        street: 'Main Street',
        streetNumber: '777',
        municipality: 'Brno',
        postalCode: '15000',
      },
    ])
    .$returningId()

  const [
    beneficiaryUser1Id,
    beneficiaryUser2Id,
    beneficiaryUser3Id,
    beneficiaryUser4Id,
  ] = await db
    .insert(user)
    .values([
      // beneficiaries
      {
        name: 'Young',
        surname: 'Gatchell',
        displayName: 'Young Gatchell',
        gender: 'Male',
        phone: '+420666666661',
        email: 'gatyou@quacker.com',
        password: await hashPassword('heslo123'),
        addressId: addressId1.id,
        confirmed: true,
        type: 'User',
      },
      {
        name: 'Petr',
        surname: 'Hochman',
        displayName: 'Petr Hochman',
        gender: 'Male',
        phone: '+420555555551',
        email: 'hocpet@quacker.com',
        password: await hashPassword('heslo123'),
        addressId: addressId2.id,
        confirmed: true,
        type: 'User',
      },
      {
        name: 'Alice',
        surname: 'Novakova',
        displayName: 'Alice Novakova',
        email: 'novali@quacker.com',
        gender: 'Female',
        phone: '+420444444441',
        password: await hashPassword('heslo123'),
        addressId: addressId3.id,
        confirmed: true,
        type: 'User',
      },
      {
        name: 'Radek',
        surname: 'Lochman',
        displayName: 'Radek Lochman',
        gender: 'Male',
        phone: '+420555555555',
        email: 'locrad@quacker.com',
        password: await hashPassword('heslo123'),
        addressId: addressId4.id,
        confirmed: true,
        type: 'User',
      },
      // notaries
      {
        name: 'Jan',
        surname: 'Michalec',
        displayName: 'Jan Michalec',
        gender: 'Male',
        phone: '+42033333333š',
        email: 'michalec@quacker.com',
        password: await hashPassword('heslo123'),
        addressId: addressId5.id,
        confirmed: true,
        type: 'Notary',
        notaryId: notaryId1.id,
      },
      {
        name: 'Tomas',
        surname: 'Vesely',
        displayName: 'Tomas Vesely',
        gender: 'Male',
        phone: '+420333333331',
        email: 'vestom@quacker.com',
        password: await hashPassword('heslo123'),
        addressId: addressId6.id,
        confirmed: true,
        type: 'Notary',
        notaryId: notaryId2.id,
      },
      // admin account
      {
        name: 'Admin',
        surname: 'Admin',
        displayName: 'Admin Admin',
        email: 'admin@portal.com',
        password: await hashPassword('heslo123'),
        confirmed: true,
        type: 'Admin',
      },
    ])
    .$returningId()

  // proceedings
  const [proceedingId1, proceedingId2] = await db
    .insert(proceeding)
    .values([
      {
        notaryId: notaryId1.id,
        name: generateProceedingName(
          'Alice',
          'Novakova',
          new Date('2024-01-01')
        ),
        state: 'InProgress',
        startDate: new Date('2024-01-01'),
        deceasedName: 'Alice',
        deceasedSurname: 'Novakova',
        deceasedDisplayName: 'Alice Novakova',
        deceasedAddressId: deceasedAddressId1.id,
        deceasedDateOfBirth: new Date('1940-01-01'),
        deceasedDateOfDeath: new Date('2023-12-31'),
      },
      {
        notaryId: notaryId2.id,
        name: generateProceedingName('Jan', 'Svoboda', new Date('2024-01-01')),
        state: 'InProgress',
        startDate: new Date('2024-01-01'),
        deceasedName: 'Jan',
        deceasedSurname: 'Svoboda',
        deceasedDisplayName: 'Jan Svoboda',
        deceasedAddressId: deceasedAddressId2.id,
        deceasedDateOfBirth: new Date('1940-01-01'),
        deceasedDateOfDeath: new Date('2023-12-31'),
      },
    ])
    .$returningId()

  await db
    .insert(chat)
    .values([
      { proceedingId: proceedingId1.id },
      { proceedingId: proceedingId2.id },
    ])

  // create beneficiaries
  const [beneficiary1Id, beneficiary2Id] = await db
    .insert(beneficiary)
    .values([
      // main beneficiaries first so i can get them as variables to pass check-all test
      {
        userId: beneficiaryUser1Id.id,
        proceedingId: proceedingId1.id,
      },
      {
        userId: beneficiaryUser3Id.id,
        proceedingId: proceedingId2.id,
      },
      {
        userId: beneficiaryUser2Id.id,
        proceedingId: proceedingId1.id,
      },
      {
        userId: beneficiaryUser4Id.id,
        proceedingId: proceedingId2.id,
      },
    ])
    .$returningId()

  // set main beneficiaries

  await db
    .update(proceeding)
    .set({ mainBeneficiaryId: beneficiary1Id.id })
    .where(eq(proceeding.id, proceedingId1.id))

  await db
    .update(proceeding)
    .set({ mainBeneficiaryId: beneficiary2Id.id })
    .where(eq(proceeding.id, proceedingId2.id))

  // create assets
  await db.insert(asset).values([
    {
      proceedingId: proceedingId1.id,
      value: 100_000,
      name: 'Auto',
      type: 'Automobile',
    },
    {
      proceedingId: proceedingId2.id,
      value: 200_000,
      name: 'Dům',
      type: 'Other',
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
    await db.delete(address)
    await db.delete(notaryDateRule)
    await db.delete(proceeding)
    await db.delete(asset)
    await db.delete(chat)
    await db.delete(chatMessage)
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

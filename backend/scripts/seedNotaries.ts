import { inArray } from 'drizzle-orm'
import { MySql2Database } from 'drizzle-orm/mysql2'

import {
  ContactSeedValue,
  NotaryDateRuleValue,
  NotarySeedData,
  notarySeedData,
} from '../src/db/notarySeedData'
import { contact, notary, notaryDateRule, user } from '../src/db/schema'
import { hashPassword } from '../src/services/passwordHashService'

// Function to insert contacts and return their IDs
async function createContacts(
  db: MySql2Database<typeof import('../src/db/schema')>,
  contactValues: ContactSeedValue[] // Pass the prepared contact values here
) {
  console.log('Seeding contacts...')

  // Insert contacts and return the list of inserted contact IDs
  const insertedContacts = await db
    .insert(contact)
    .values(contactValues)
    .$returningId() // In MySQL, $returningId fetches the inserted IDs

  console.log('Contacts inserted with IDs:', insertedContacts)

  const contactIds = insertedContacts.map((contact) => contact.id)
  return contactIds // Return the contact IDs
}

// Function to create users based on the contact IDs
async function createUsers(
  db: MySql2Database<typeof import('../src/db/schema')>,
  contactIds: number[]
) {
  console.log('Seeding users based on contact IDs...')

  // Step 1: Fetch contact records by their IDs
  const contactRecords = await db
    .select()
    .from(contact)
    .where(inArray(contact.id, contactIds))

  // Step 2: Prepare user data based on the fetched contact records
  const userValues = await Promise.all(
    contactRecords.map(async (contactRecord) => ({
      login: contactRecord.email, // Use contact email as login
      password: await hashPassword('defaultpassword'), // Hash the default password
      contactId: contactRecord.id, // Link user to the contact
      role: 'notary', // Default role for users
    }))
  )

  // Step 3: Insert all users and return their IDs
  const insertedUsers = await db.insert(user).values(userValues).$returningId()
  const userIds = insertedUsers.map((user) => user.id)

  console.log('Users created with IDs:', userIds)
  return userIds // Return the user IDs
}

// Function to create notaries based on user IDs
async function createNotaries(
  db: MySql2Database<typeof import('../src/db/schema')>,
  userIds: number[]
) {
  console.log('Seeding notaries based on user IDs...')

  // Step 1: Prepare notary data based on the user IDs
  const notaryValues = userIds.map((userId) => ({
    userId, // Link the notary to the corresponding user
    businessContactId: userId, // Assuming a similar business contact ID for now
  }))

  // Step 2: Insert all notaries and return their IDs
  const insertedNotaries = await db
    .insert(notary)
    .values(notaryValues)
    .$returningId()
  const notaryIds = insertedNotaries.map((notary) => notary.id)

  console.log('Notaries created with IDs:', notaryIds)
  return notaryIds
}

// Function to create notary date rules based on the notary IDs
async function createNotaryDateRules(
  db: MySql2Database<typeof import('../src/db/schema')>,
  notaryIds: number[],
  notarySeedData: NotarySeedData[] // Pass the prepared date rules here
) {
  console.log('Seeding notary date rules...')

  // Step 1: Prepare notary date rule data
  const notaryDateRules = notarySeedData.flatMap((notary, index) => {
    const notaryId = notaryIds[index] // Match notary IDs to the seed data
    return notary.dateRules.map((dateRule) => ({
      notaryId,
      startDay: dateRule.startDay,
      endDay: dateRule.endDay,
      startMonth: dateRule.startMonth,
      endMonth: dateRule.endMonth,
    }))
  })

  // Step 2: Insert notary date rules
  await db.insert(notaryDateRule).values(notaryDateRules)

  console.log('Notary date rules seeded.')
}

// Function to seed notaries and their date rules
export async function seedNotariesAndDateRules(
  db: MySql2Database<typeof import('../src/db/schema')>
) {
  console.log('Starting to seed notaries and date rules...')
  // Step 1: Create contacts and retrieve their IDs
  const contactValues = notarySeedData.map((notary) => notary.contact)
  const contactIds = await createContacts(db, contactValues)
  console.log('Contact IDs:', contactIds)

  // Step 2: Create users based on the contact IDs and retrieve their IDs
  const userIds = await createUsers(db, contactIds)
  console.log('User IDs:', userIds)

  // Step 3: Create notaries based on the user IDs and retrieve their IDs
  const notaryIds = await createNotaries(db, userIds)
  console.log('Notary IDs:', notaryIds)

  // Step 4: Create notary date rules based on the notary IDs
  await createNotaryDateRules(db, notaryIds, notarySeedData)
  console.log('Notary date rules created successfully.')

  console.log('Seeding process completed.')
}

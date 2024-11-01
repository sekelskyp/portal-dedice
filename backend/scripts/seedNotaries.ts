import { MySql2Database } from 'drizzle-orm/mysql2'

import { notarySeedDataValues } from '../src/db/notarySeedData'
import { getContactRepository } from '../src/graphql/modules/contact/contactRepository'
import { getNotaryRepository } from '../src/graphql/modules/notary/notaryRepository'
import { getNotaryDateRuleRepository } from '../src/graphql/modules/notaryDateRule/notaryDateRuleRepository'

// Main function to seed contacts, notaries, and date rules
export async function seedNotariesAndDateRules(
  db: MySql2Database<typeof import('../src/db/schema')>
) {
  console.log('Starting to seed contacts, notaries, and date rules...')

  // Step 1: Initialize repositories
  const contactRepository = getContactRepository(db)
  const notaryRepository = getNotaryRepository(db)
  const notaryDateRuleRepository = getNotaryDateRuleRepository(db)

  // Step 2: Insert contacts in bulk and retrieve their IDs
  const contactValues = notarySeedDataValues.map((notary) => notary.contact)
  const contactIds = await contactRepository.createContacts(contactValues)
  console.log('Contact IDs:', contactIds)

  // Step 3: Prepare and insert notaries based on contact IDs
  const notaryValues = contactIds.map((contactId, index) => ({
    contactId,
    businessContactId: contactId, // Assuming business contact ID is the same as contact ID
  }))
  const notaryIds = await notaryRepository.createNotaries(notaryValues)
  console.log('Notary IDs:', notaryIds)

  // Step 4: Prepare and insert notary date rules based on notary IDs
  const notaryDateRules = notarySeedDataValues.flatMap((notary, index) => {
    const notaryId = notaryIds[index] // Match notary IDs to the seed data
    return notary.dateRules.map((dateRule) => ({
      notaryId,
      startDay: dateRule.startDay,
      endDay: dateRule.endDay,
      startMonth: dateRule.startMonth,
      endMonth: dateRule.endMonth,
    }))
  })
  await notaryDateRuleRepository.createNotaryDateRules(notaryDateRules)
  console.log('Notary date rules seeded successfully.')

  console.log('Seeding process completed.')

  return {
    contactIds,
    notaryIds,
  }
}

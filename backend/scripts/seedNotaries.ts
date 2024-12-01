import { MySql2Database } from 'drizzle-orm/mysql2'

import { notarySeedDataValues } from '../src/db/notarySeedData'
import { getAddressRepository } from '../src/graphql/modules/address/addressRepository'
import { getNotaryRepository } from '../src/graphql/modules/notary/notaryRepository'
import { getNotaryDateRuleRepository } from '../src/graphql/modules/notaryDateRule/notaryDateRuleRepository'
import {
  getUserRepository,
  UserInsertInput,
} from '../src/graphql/modules/user/userRepository'
import { hashPassword } from '../src/services/passwordHashService'

export async function seedNotariesAndDateRules(
  db: MySql2Database<typeof import('../src/db/schema')>
) {
  console.log('Starting to seed addresses, users, notaries, and date rules...')

  try {
    // Step 1: Initialize repositories
    const addressRepository = getAddressRepository(db)
    const userRepository = getUserRepository(db)
    const notaryRepository = getNotaryRepository(db)
    const notaryDateRuleRepository = getNotaryDateRuleRepository(db)

    // Step 2: Insert addresses in bulk
    console.log('Inserting addresses...')
    const addressValues = notarySeedDataValues.map((notary) => notary.address)
    const addressIds = await addressRepository.createAddresses(addressValues)
    console.log('Address IDs:', addressIds)

    // Step 3: Insert notaries based on postal codes from addresses
    console.log('Inserting notaries...')
    const notaryValues = addressValues.map((addressValue) => ({
      postalCode: addressValue.postalCode,
    }))
    const notaryIds = await notaryRepository.createNotaries(notaryValues)
    console.log('Notary IDs:', notaryIds)

    // Step 4: Insert users and link them to notaries
    console.log('Inserting users...')
    const userValues: UserInsertInput[] = await Promise.all(
      notarySeedDataValues.map(
        async (notary, index): Promise<UserInsertInput> => ({
          ...notary.user,
          password: await hashPassword('heslo123'), // Ensure the password is hashed
          addressId: addressIds[index], // Link user to address
          notaryId: notaryIds[index], // Link user to notary
        })
      )
    )
    const userIds = await userRepository.createUsers(userValues)
    console.log('User IDs:', userIds)

    // Step 5: Insert notary date rules linked to notaries
    console.log('Inserting notary date rules...')
    const notaryDateRules = notarySeedDataValues.flatMap((notary, index) => {
      const notaryId = notaryIds[index]
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

    console.log('Seeding process completed successfully.')

    return {
      addressIds,
      userIds,
      notaryIds,
    }
  } catch (error) {
    console.error('Error during seeding process:', error)
    throw new Error('Seeding process failed')
  }
}

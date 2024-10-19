import { and, eq, gte, lte, sql } from 'drizzle-orm'

import {
  contact,
  inheritanceProcedure,
  notary,
  notaryDateRule,
} from '@backend/db/schema'
import { CustomContext } from '@backend/types/types'

export interface Address {
  postalCode: string
}

export const getNotaryByAddressAndBirthDate = async (
  address: Address,
  beneficiaryBirthDay: Date,
  context: CustomContext
): Promise<number | null> => {
  const { db } = context // Get the db from the context

  // Parse birth date to extract birth month and day
  const birthMonth = beneficiaryBirthDay.getMonth() + 1
  const birthDay = beneficiaryBirthDay.getDate()

  // Query the database to find the notary with the least open procedures
  const notaryResult = await db
    .select({
      notaryId: notary.id,
      postalCode: contact.postalCode,
      openProcedureCount: sql<number>`COUNT(${inheritanceProcedure.id})`.as(
        'openProcedureCount'
      ),
    })
    .from(notary)
    .leftJoin(contact, eq(notary.businessContactId, contact.id)) // Join notary with contact by businessContactId
    .leftJoin(
      notaryDateRule,
      and(
        eq(notaryDateRule.notaryId, notary.id), // Match the notary's date rule
        gte(notaryDateRule.startMonth, birthMonth),
        lte(notaryDateRule.endMonth, birthMonth),
        gte(notaryDateRule.startDay, birthDay),
        lte(notaryDateRule.endDay, birthDay)
      )
    )
    .leftJoin(
      inheritanceProcedure,
      and(
        eq(inheritanceProcedure.notaryId, notary.id), // Join with procedures table
        eq(inheritanceProcedure.state, 'InProgress') // Only count open procedures
      )
    )
    .where(sql`LEFT(${contact.postalCode}, 2) = LEFT(${address.postalCode}, 2)`) // Match the first two digits of postal code
    .groupBy(notary.id) // Group by notary ID to count the procedures
    .orderBy(sql`openProcedureCount ASC`) // Order by least open procedures
    .limit(1) // Limit to the notary with the fewest open procedures

  if (!notaryResult.length) {
    throw new Error(
      `No notary found for postal code: ${address.postalCode}, birth month: ${birthMonth}, and day: ${birthDay}`
    )
  }

  return notaryResult[0].notaryId
}

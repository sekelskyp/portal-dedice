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

interface ContactData {
  id: number
  name: string
  surname: string
  dateOfBirth: Date
  gender: string
  phone: string | null
  email: string
  country: string
  city: string
  street: string
  postalCode: string
}

interface NotaryData {
  id: number
  contact: ContactData
}

export const getNotaryByAddressAndBirthDate = async (
  address: Address,
  expirationDate: Date,
  context: CustomContext
): Promise<NotaryData | null> => {
  const { db } = context // Get the db from the context

  // Parse birth date to extract birth month and day
  const birthMonth = expirationDate.getMonth() + 1
  const birthDay = expirationDate.getDate()

  // Query the database to find the notary with the least open procedures and join the related contact and user data
  const notaryResult = await db
    .select({
      id: notary.id,
      contact: {
        id: contact.id,
        name: contact.name,
        surname: contact.surname,
        dateOfBirth: contact.dateOfBirth,
        gender: contact.gender,
        phone: contact.phone,
        email: contact.email,
        country: contact.country,
        city: contact.city,
        street: contact.street,
        postalCode: contact.postalCode,
      },
      openProcedureCount: sql<number>`COUNT(${inheritanceProcedure.id})`.as(
        'openProcedureCount'
      ),
    })
    .from(notary)
    .leftJoin(contact, eq(notary.businessContactId, contact.id))
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
        eq(inheritanceProcedure.notaryId, notary.id),
        eq(inheritanceProcedure.state, 'InProgress')
      )
    )
    .where(sql`LEFT(${contact.postalCode}, 2) = LEFT(${address.postalCode}, 2)`)
    .groupBy(notary.id)
    .orderBy(sql`openProcedureCount ASC`)
    .limit(1)

  if (!notaryResult.length) {
    throw new Error(
      `No notary found for postal code: ${address.postalCode}, birth month: ${birthMonth}, and day: ${birthDay}`
    )
  }

  return { id: notaryResult[0].id!, contact: notaryResult[0].contact! }
}

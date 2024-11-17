import { and, eq, inArray, sql } from 'drizzle-orm'

import { type Db } from '@backend/types/types'

import { contact, notary, notaryDateRule } from '../../../db/schema'

export interface NotaryData {
  contactId?: number
  userId?: number
}

export function getNotaryRepository(db: Db) {
  function getNotaryById(id: number) {
    return db
      .select()
      .from(notary)
      .where(eq(notary.id, id))
      .then(([notary]) => notary)
  }

  function getNotariesByIds(ids: number[]) {
    return db
      .select()
      .from(notary)
      .where(inArray(notary.id, ids))
      .then((notaries) => notaries)
  }

  function getNotariesByUserId(id: number) {
    return db.select().from(notary).where(eq(notary.userId, id))
  }

  function getAllNotaries() {
    return db
      .select()
      .from(notary)
      .then((notaries) => notaries)
  }

  async function createNotary({
    contactId = null,
    userId = null,
  }: {
    contactId?: number | null
    userId?: number | null
  }) {
    const resultingIds = await db
      .insert(notary)
      .values({
        contactId,
        userId,
      })
      .$returningId()

    return resultingIds[0]
  }

  async function createNotaries(data: NotaryData[]): Promise<number[]> {
    const results = await db.insert(notary).values(data).$returningId()
    return results.map((notary) => notary.id)
  }

  async function deleteNotaryById(id: number): Promise<number> {
    const notaryResult = await db.select().from(notary).where(eq(notary.id, id))
    await db.delete(notary).where(eq(notary.id, id))
    return notaryResult[0].id
  }

  async function findAvailableNotary(
    dateOfDeathMonthNumber: number,
    dateOfDeathDayNumber: number,
    addressPostCode: string
  ) {
    const result = await db
      .select({ id: notary.id })
      .from(notary)
      .leftJoin(contact, eq(notary.contactId, contact.id))
      .leftJoin(
        notaryDateRule,
        and(
          eq(notaryDateRule.notaryId, notary.id),
          eq(notaryDateRule.startMonth, dateOfDeathMonthNumber),
          eq(notaryDateRule.startDay, dateOfDeathDayNumber)
        )
      )
      .where(
        sql`LEFT(${contact.addressPostCode}, 2) = LEFT(${addressPostCode}, 2)`
      )
      .groupBy(notary.id)
      .limit(1)

    if (result.length === 0) {
      throw new Error('Notář nebyl nalezen.')
    }

    return await db.select().from(notary).where(eq(notary.id, result[0].id))
  }

  return {
    getNotaryById,
    getNotariesByIds,
    getAllNotaries,
    createNotary,
    deleteNotaryById,
    findAvailableNotary,
    createNotaries,
    getNotariesByUserId,
  }
}

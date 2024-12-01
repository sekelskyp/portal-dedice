import {
  and,
  eq,
  inArray,
  InferInsertModel,
  InferSelectModel,
  sql,
} from 'drizzle-orm'

import { type Db } from '@backend/types/types'

import { notary, notaryDateRule } from '../../../db/schema'

export interface NotaryEntity extends InferSelectModel<typeof notary> {}
export interface NotaryInsertInput
  extends InferInsertModel<Omit<typeof notary, 'id'>> {}

export function getNotaryRepository(db: Db) {
  function getNotaryById(id: number): Promise<NotaryEntity | null> {
    return db
      .select()
      .from(notary)
      .where(eq(notary.id, id))
      .then(([notary]) => notary)
  }

  function getNotariesByIds(ids: number[]): Promise<NotaryEntity[]> {
    return db
      .select()
      .from(notary)
      .where(inArray(notary.id, ids))
      .then((notaries) => notaries)
  }

  function getAllNotaries() {
    return db
      .select()
      .from(notary)
      .then((notaries) => notaries)
  }

  async function createNotary(data: NotaryInsertInput): Promise<number> {
    const [result] = await db.insert(notary).values(data).$returningId()
    return result.id
  }

  async function createNotaries(data: NotaryInsertInput[]): Promise<number[]> {
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
  ): Promise<number | null> {
    const result = await db
      .select({ id: notary.id })
      .from(notary)
      .leftJoin(
        notaryDateRule,
        and(
          eq(notaryDateRule.notaryId, notary.id),
          eq(notaryDateRule.startMonth, dateOfDeathMonthNumber),
          eq(notaryDateRule.startDay, dateOfDeathDayNumber)
        )
      )
      .where(sql`LEFT(${notary.postalCode}, 2) = LEFT(${addressPostCode}, 2)`)
      .groupBy(notary.id)
      .limit(1)
    return result[0].id || null
  }

  return {
    getNotaryById,
    getNotariesByIds,
    getAllNotaries,
    createNotary,
    deleteNotaryById,
    findAvailableNotary,
    createNotaries,
  }
}

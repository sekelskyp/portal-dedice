import { eq, inArray } from 'drizzle-orm'

import { notary } from '@backend/db/schema'
import { type Db } from '@backend/types/types'

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

  async function deleteNotaryById(id: number): Promise<number> {
    const notaryResult = await db.select().from(notary).where(eq(notary.id, id))
    await db.delete(notary).where(eq(notary.id, id))
    return notaryResult[0].id
  }

  return {
    getNotaryById,
    getNotariesByIds,
    getAllNotaries,
    createNotary,
    deleteNotaryById,
  }
}

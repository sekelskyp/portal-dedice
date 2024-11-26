import { eq, inArray, InferInsertModel, InferSelectModel } from 'drizzle-orm'

import { beneficiary, notary, proceeding, user } from '@backend/db/schema'
import { type Db } from '@backend/types/types'

export interface ProceedingEntity extends InferSelectModel<typeof proceeding> {}
export interface ProceedingInsertInput
  extends InferInsertModel<Omit<typeof proceeding, 'id'>> {}

export function getProceedingRepository(db: Db) {
  async function getProceedingById(
    id: number
  ): Promise<ProceedingEntity | null> {
    const [result] = await db
      .select()
      .from(proceeding)
      .where(eq(proceeding.id, id))
    return result || null
  }

  async function getProceedingsByIds(
    ids: number[]
  ): Promise<ProceedingEntity[]> {
    return await db.select().from(proceeding).where(inArray(proceeding.id, ids))
  }

  async function getAllProceedings(): Promise<ProceedingEntity[]> {
    return await db.select().from(proceeding)
  }

  async function createProceeding(
    data: ProceedingInsertInput
  ): Promise<number> {
    const [result] = await db.insert(proceeding).values(data).$returningId()
    return result.id
  }

  async function deleteProceedingById(id: number): Promise<number> {
    const [result] = await db
      .select()
      .from(proceeding)
      .where(eq(proceeding.id, id))
    await db.delete(proceeding).where(eq(proceeding.id, id))
    return result.id
  }

  async function deleteProceedingsByIds(ids: number[]): Promise<void> {
    await db.delete(proceeding).where(inArray(proceeding.id, ids))
  }

  async function updateProceeding(
    id: number,
    data: Partial<ProceedingInsertInput>
  ): Promise<void> {
    await db.update(proceeding).set(data).where(eq(proceeding.id, id))
  }

  async function getProceedingsByNotaryId(
    notaryId: number
  ): Promise<ProceedingEntity[]> {
    return await db
      .select()
      .from(proceeding)
      .where(eq(proceeding.notaryId, notaryId))
  }

  async function getBeneficiaryProceedingsForUser(
    userId: number
  ): Promise<ProceedingEntity[]> {
    const results = await db
      .select()
      .from(proceeding)
      .leftJoin(
        beneficiary,
        eq(beneficiary.proceedingId, proceeding.id) // Join based on proceedingId
      )
      .where(eq(beneficiary.userId, userId)) // Filter by userId
    // Return only the proceeding data
    return results.map((record) => ({ ...record.proceeding }))
  }

  async function getNotaryProceedingsForUser(
    userId: number
  ): Promise<ProceedingEntity[]> {
    const results = await db
      .select()
      .from(proceeding)
      .innerJoin(notary, eq(proceeding.notaryId, notary.id))
      .innerJoin(user, eq(user.notaryId, notary.id))
      .where(eq(user.id, userId))
    // Return only the proceeding data
    return results.map((record) => ({ ...record.proceeding }))
  }

  return {
    getProceedingById,
    getProceedingsByIds,
    getAllProceedings,
    createProceeding,
    deleteProceedingById,
    updateProceeding,
    getProceedingsByNotaryId,
    deleteProceedingsByIds,
    getBeneficiaryProceedingsForUser,
    getNotaryProceedingsForUser,
  }
}

import { eq, inArray, InferInsertModel, InferSelectModel } from 'drizzle-orm'

import { beneficiary } from '@backend/db/schema'
import { Db } from '@backend/types/types'

export interface BeneficiaryEntity
  extends InferSelectModel<typeof beneficiary> {}
export interface BeneficiaryInsertInput
  extends InferInsertModel<Omit<typeof beneficiary, 'id'>> {}

export function getBeneficiaryRepository(db: Db) {
  // Get a beneficiary by ID
  async function getBeneficiaryById(
    id: number
  ): Promise<BeneficiaryEntity | null> {
    const [result] = await db
      .select()
      .from(beneficiary)
      .where(eq(beneficiary.id, id))
    return result || null
  }

  async function getBeneficiariesByIds(
    ids: number[]
  ): Promise<BeneficiaryEntity[]> {
    const results = await db
      .select()
      .from(beneficiary)
      .where(inArray(beneficiary.id, ids))
    return results
  }

  // Get all beneficiaries associated with a specific procedure
  async function getBeneficiariesByProceedingId(
    proceedingId: number
  ): Promise<BeneficiaryEntity[]> {
    return await db
      .select()
      .from(beneficiary)
      .where(eq(beneficiary.proceedingId, proceedingId))
  }

  // Create a new beneficiary
  async function createBeneficiary(
    data: BeneficiaryInsertInput
  ): Promise<BeneficiaryEntity> {
    const [result] = await db.insert(beneficiary).values(data).$returningId()
    return {
      id: result.id,
      userId: data.userId,
      proceedingId: data.proceedingId!,
    }
  }

  // Create multiple beneficiaries
  async function createBeneficiaries(
    data: BeneficiaryInsertInput[]
  ): Promise<BeneficiaryEntity[]> {
    return Promise.all(data.map(createBeneficiary))
  }

  // Update an existing beneficiary by ID
  async function updateBeneficiaryById(
    id: number,
    data: Partial<BeneficiaryInsertInput>
  ): Promise<void> {
    await db.update(beneficiary).set(data).where(eq(beneficiary.id, id))
  }

  async function deleteBeneficiariesByIds(ids: number[]): Promise<void> {
    await db.delete(beneficiary).where(inArray(beneficiary.id, ids))
  }

  function getBeneficiariesByUserId(id: number): Promise<BeneficiaryEntity[]> {
    return db.select().from(beneficiary).where(eq(beneficiary.userId, id))
  }

  return {
    getBeneficiaryById,
    getBeneficiariesByProceedingId,
    createBeneficiary,
    getBeneficiariesByIds,
    createBeneficiaries,
    updateBeneficiaryById,
    deleteBeneficiariesByIds,
    getBeneficiariesByUserId,
  }
}

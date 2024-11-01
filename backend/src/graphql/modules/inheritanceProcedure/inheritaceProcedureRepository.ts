import { eq, or } from 'drizzle-orm'

import {
  beneficiaryInheritanceProcedureRel,
  inheritanceProcedure,
  InheritanceProcedureStateEnumType,
} from '@backend/db/schema'
import { Db } from '@backend/types/types'

export interface InheritanceProcedureData {
  notaryId?: number | null
  mainBeneficiaryId?: number | null
  name: string
  state?: InheritanceProcedureStateEnumType
  startDate: Date
  endDate?: Date | null
  deceasedDateOfBirth?: Date | null
  deceasedDateOfDeath?: Date | null
}

export function getInheritanceProcedureRepository(db: Db) {
  async function getProcedureById(id: number) {
    const [result] = await db
      .select()
      .from(inheritanceProcedure)
      .where(eq(inheritanceProcedure.id, id))
    return result || null
  }

  async function getAllProcedures() {
    return await db.select().from(inheritanceProcedure)
  }

  async function createProcedure(data: InheritanceProcedureData) {
    const [result] = await db
      .insert(inheritanceProcedure)
      .values(data)
      .$returningId()
    return result
  }

  async function deleteProcedureById(id: number): Promise<number> {
    const [result] = await db
      .select()
      .from(inheritanceProcedure)
      .where(eq(inheritanceProcedure.id, id))
    await db.delete(inheritanceProcedure).where(eq(inheritanceProcedure.id, id))
    return result.id
  }

  async function updateProcedure(
    id: number,
    data: Partial<InheritanceProcedureData>
  ): Promise<void> {
    await db
      .update(inheritanceProcedure)
      .set(data)
      .where(eq(inheritanceProcedure.id, id))
  }

  async function getProceduresByNotaryId(notaryId: number) {
    return await db
      .select()
      .from(inheritanceProcedure)
      .where(eq(inheritanceProcedure.notaryId, notaryId))
  }

  async function getProceduresByBeneficiaryId(beneficiaryId: number) {
    return await db
      .select()
      .from(inheritanceProcedure)
      .leftJoin(
        beneficiaryInheritanceProcedureRel,
        eq(
          beneficiaryInheritanceProcedureRel.inheritanceProcedureId,
          inheritanceProcedure.id
        )
      )
      .where(
        // Fetches where beneficiary is either mainBeneficiary or linked via the relationship table
        or(
          eq(inheritanceProcedure.mainBeneficiaryId, beneficiaryId),
          eq(beneficiaryInheritanceProcedureRel.beneficiaryId, beneficiaryId)
        )
      )
  }

  return {
    getProcedureById,
    getAllProcedures,
    createProcedure,
    deleteProcedureById,
    updateProcedure,
    getProceduresByNotaryId,
    getProceduresByBeneficiaryId,
  }
}

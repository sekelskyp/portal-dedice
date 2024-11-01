import { and, eq, inArray } from 'drizzle-orm'

import {
  beneficiary,
  beneficiaryInheritanceProcedureRel,
  DeceasedRelationEnumType,
} from '@backend/db/schema'
import { Db } from '@backend/types/types'

export interface BeneficiaryData {
  userId?: number | null
  deceasedRelation?: DeceasedRelationEnumType | null
  contactId?: number | null
  dateOfBirth?: Date | null
}

export interface BeneficiaryInheritanceProcedureRelData {
  inheritanceProcedureId: number
  beneficiaryId: number
}

export function getBeneficiaryRepository(db: Db) {
  // Get a beneficiary by ID
  async function getBeneficiaryById(id: number) {
    const [result] = await db
      .select()
      .from(beneficiary)
      .where(eq(beneficiary.id, id))
    return result || null
  }

  async function getBeneficiariesByIds(ids: number[]) {
    const results = await db
      .select()
      .from(beneficiary)
      .where(inArray(beneficiary.id, ids))

    return results
  }

  // Get all beneficiaries associated with a specific procedure
  async function getBeneficiariesByProcedureId(procedureId: number) {
    return await db
      .select()
      .from(beneficiary)
      .innerJoin(
        beneficiaryInheritanceProcedureRel,
        eq(beneficiary.id, beneficiaryInheritanceProcedureRel.beneficiaryId)
      )
      .where(
        eq(
          beneficiaryInheritanceProcedureRel.inheritanceProcedureId,
          procedureId
        )
      )
  }

  // Create a new beneficiary
  async function createBeneficiary(data: BeneficiaryData): Promise<number> {
    const [result] = await db.insert(beneficiary).values(data).$returningId()
    return result.id
  }

  // Create multiple beneficiaries
  async function createBeneficiaries(
    data: BeneficiaryData[]
  ): Promise<number[]> {
    const results = await db.insert(beneficiary).values(data).$returningId()

    return results.map((result) => result.id)
  }

  // Update an existing beneficiary by ID
  async function updateBeneficiary(
    id: number,
    data: Partial<BeneficiaryData>
  ): Promise<void> {
    await db.update(beneficiary).set(data).where(eq(beneficiary.id, id))
  }

  async function deleteBeneficiary(id: number): Promise<void> {
    await db.delete(beneficiary).where(eq(beneficiary.id, id))
  }

  async function insertBeneficiaryProcedureRelation(
    data: BeneficiaryInheritanceProcedureRelData
  ): Promise<void> {
    await db.insert(beneficiaryInheritanceProcedureRel).values({
      inheritanceProcedureId: data.inheritanceProcedureId,
      beneficiaryId: data.beneficiaryId,
    })
  }

  async function deleteBeneficiaryProcedureRelations(
    procedureId: number,
    beneficiaryId: number
  ): Promise<void> {
    await db
      .delete(beneficiaryInheritanceProcedureRel)
      .where(
        and(
          eq(
            beneficiaryInheritanceProcedureRel.inheritanceProcedureId,
            procedureId
          ),
          eq(beneficiaryInheritanceProcedureRel.beneficiaryId, beneficiaryId)
        )
      )
  }

  function getBeneficiariesByUserId(id: number) {
    return db.select().from(beneficiary).where(eq(beneficiary.userId, id))
  }

  // Insert multiple BeneficiaryProcedureRelations
  async function insertMultipleBeneficiaryProcedureRelations(
    relationsData: BeneficiaryInheritanceProcedureRelData[]
  ): Promise<void> {
    const formattedRelations = relationsData.map((relation) => ({
      inheritanceProcedureId: relation.inheritanceProcedureId,
      beneficiaryId: relation.beneficiaryId,
    }))

    await db
      .insert(beneficiaryInheritanceProcedureRel)
      .values(formattedRelations)
  }

  return {
    getBeneficiaryById,
    getBeneficiariesByProcedureId,
    createBeneficiary,
    getBeneficiariesByIds,
    createBeneficiaries,
    updateBeneficiary,
    deleteBeneficiary,
    insertBeneficiaryProcedureRelation,
    deleteBeneficiaryProcedureRelations,
    getBeneficiariesByUserId,
    insertMultipleBeneficiaryProcedureRelations,
  }
}

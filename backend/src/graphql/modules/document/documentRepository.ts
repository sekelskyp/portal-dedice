import {
  count,
  eq,
  inArray,
  InferInsertModel,
  InferSelectModel,
} from 'drizzle-orm'

import { document } from '@backend/db/schema'
import { Db } from '@backend/types/types'

export interface DocumentEntity extends InferSelectModel<typeof document> {} // Represents a database row
export interface DocumentInsertInput
  extends InferInsertModel<Omit<typeof document, 'id'>> {} // Represents input data for insert operations

export function getDocumentRepository(db: Db) {
  async function createDocument(data: DocumentInsertInput): Promise<number> {
    const [result] = await db.insert(document).values(data).$returningId()
    return result.id
  }

  async function getDocumentById(id: number): Promise<DocumentEntity | null> {
    const [result] = await db.select().from(document).where(eq(document.id, id))
    return result || null
  }

  async function getDocumentsByProceedingId(
    proceedingId: number
  ): Promise<DocumentEntity[]> {
    const results = await db
      .select()
      .from(document)
      .where(eq(document.proceedingId, proceedingId))
    return results
  }

  async function getDocumentCountByProcedureId(
    procedureId: number
  ): Promise<number> {
    const result = await db
      .select({ count: count() }) // Use raw SQL to count rows
      .from(document)
      .where(eq(document.proceedingId, procedureId))

    return result[0].count // Extract the count from the result
  }

  async function updateDocumentById(
    id: number,
    data: Partial<DocumentInsertInput>
  ) {
    const result = await db
      .update(document)
      .set(data)
      .where(eq(document.id, id))
    return result
  }

  async function deleteDocumentsByIds(ids: number[]): Promise<void> {
    await db.delete(document).where(inArray(document.id, ids))
  }

  async function getDocumentsByIds(ids: number[]): Promise<DocumentEntity[]> {
    const results = await db
      .select()
      .from(document)
      .where(inArray(document.id, ids))
    return results
  }

  return {
    createDocument,
    getDocumentById,
    getDocumentsByProceedingId,
    updateDocumentById,
    deleteDocumentsByIds,
    getDocumentsByIds,
    getDocumentCountByProcedureId,
  }
}

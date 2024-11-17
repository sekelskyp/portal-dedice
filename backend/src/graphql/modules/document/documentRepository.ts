import { count, eq, inArray } from 'drizzle-orm'

import { document } from '@backend/db/schema'
import { Db } from '@backend/types/types'

export interface DocumentData {
  fileName: string
  fileType: string
  fileData: string // Assuming base64 encoded string for binary data
  userOwnerId: number | null
  taskId: number | null
  inheritanceProcedureId: number
}

export function getDocumentRepository(db: Db) {
  async function createDocument(data: DocumentData) {
    const result = await db.insert(document).values(data).$returningId()
    return result
  }

  async function getDocumentById(id: number) {
    const [result] = await db.select().from(document).where(eq(document.id, id))
    return result || null
  }

  async function getDocumentsByUserId(userOwnerId: number) {
    const results = await db
      .select()
      .from(document)
      .where(eq(document.userOwnerId, userOwnerId))
    return results
  }

  async function getDocumentsByProcedureId(procedureId: number) {
    const results = await db
      .select()
      .from(document)
      .where(eq(document.inheritanceProcedureId, procedureId))
    return results
  }

  async function getDocumentCountByProcedureId(procedureId: number) {
    const result = await db
      .select({ count: count() }) // Use raw SQL to count rows
      .from(document)
      .where(eq(document.inheritanceProcedureId, procedureId))

    return result[0].count // Extract the count from the result
  }

  async function updateDocumentById(id: number, data: Partial<DocumentData>) {
    const result = await db
      .update(document)
      .set(data)
      .where(eq(document.id, id))
    return result
  }

  async function deleteDocumentById(id: number) {
    await db.delete(document).where(eq(document.id, id))
  }

  async function deleteDocumentsByProcedureId(procedureId: number) {
    await db
      .delete(document)
      .where(eq(document.inheritanceProcedureId, procedureId))
  }

  // In documentRepository.ts
  async function deleteDocumentsByIds(ids: number[]) {
    await db.delete(document).where(inArray(document.id, ids))
  }

  async function getDocumentsByIds(ids: number[]) {
    const results = await db
      .select()
      .from(document)
      .where(inArray(document.id, ids))
    return results
  }

  return {
    createDocument,
    getDocumentById,
    getDocumentsByUserId,
    getDocumentsByProcedureId,
    updateDocumentById,
    deleteDocumentById,
    deleteDocumentsByProcedureId,
    deleteDocumentsByIds,
    getDocumentsByIds,
    getDocumentCountByProcedureId,
  }
}

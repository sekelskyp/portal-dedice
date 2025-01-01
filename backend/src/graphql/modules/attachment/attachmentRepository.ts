import {
  count,
  eq,
  inArray,
  InferInsertModel,
  InferSelectModel,
} from 'drizzle-orm'

import { attachment } from '@backend/db/schema'
import { Db } from '@backend/types/types'

export interface AttachmentEntity extends InferSelectModel<typeof attachment> {} // Represents a database row
export interface AttachmentInsertInput
  extends InferInsertModel<Omit<typeof attachment, 'id'>> {} // Represents input data for insert operations

export function getAttachmentRepository(db: Db) {
  // Create a new Attachment
  async function createAttachment(
    data: AttachmentInsertInput
  ): Promise<number> {
    const [result] = await db.insert(attachment).values(data).$returningId()
    return result.id
  }

  async function createAttachments(
    data: AttachmentInsertInput[]
  ): Promise<number[]> {
    const result = await db.insert(attachment).values(data).$returningId()
    return result.map((r) => r.id)
  }

  // Get an Attachment by ID
  async function getAttachmentById(
    id: number
  ): Promise<AttachmentEntity | null> {
    const [result] = await db
      .select()
      .from(attachment)
      .where(eq(attachment.id, id))
    return result || null
  }

  async function getAttachmentCountByProceedingId(
    proceedingId: number
  ): Promise<number> {
    const [result] = await db
      .select({ count: count() })
      .from(attachment)
      .where(eq(attachment.proceedingId, proceedingId))
    return result ? result.count : 0
  }

  async function getAttachmentsByProceedingId(
    proceedingId: number
  ): Promise<AttachmentEntity[]> {
    const results = await db
      .select()
      .from(attachment)
      .where(eq(attachment.proceedingId, proceedingId))
    return results
  }

  // Get Attachmentes by their IDs
  async function getAttachmentsByIds(
    ids: number[]
  ): Promise<AttachmentEntity[]> {
    return await db.select().from(attachment).where(inArray(attachment.id, ids))
  }

  // Update an existing Attachment
  async function updateAttachmentById(
    id: number,
    data: Partial<AttachmentInsertInput>
  ): Promise<void> {
    await db.update(attachment).set(data).where(eq(attachment.id, id))
  }

  // Delete an Attachment by ID
  async function deleteAttachmentsByIds(ids: number[]): Promise<void> {
    await db.delete(attachment).where(inArray(attachment.id, ids))
  }

  return {
    createAttachments,
    getAttachmentById,
    getAttachmentsByIds,
    createAttachment,
    deleteAttachmentsByIds,
    updateAttachmentById,
    getAttachmentCountByProceedingId,
    getAttachmentsByProceedingId,
  }
}

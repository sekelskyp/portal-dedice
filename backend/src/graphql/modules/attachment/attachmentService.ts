import { AttachmentEntity } from '@backend/graphql/modules/attachment/attachmentRepository'
import { deleteFiles, storeFile } from '@backend/services/fileStorageService'
import { CustomContext } from '@backend/types/types'

export interface CreateAttachmentInput {
  // links to other records
  proceedingId?: number
  // file data
  stream: NodeJS.ReadableStream
  filename: string
  mimetype: string
}

export async function createAttachment(
  input: CreateAttachmentInput,
  context: CustomContext
): Promise<number> {
  // Store the file using service
  const response = await storeFile(
    input as Omit<CreateAttachmentInput, 'proceedingId'>
  )
  // Save the fileUuid to the database as an attachment
  const dbRecordData = {
    proceedingId: input.proceedingId,
    fileUuid: response.fileUuid,
    filepath: response.filePath,
    filename: input.filename,
    mimetype: input.mimetype,
  }
  // return the ID of the new attachment record
  return context.attachmentRepository.createAttachment(dbRecordData)
}

export async function getAttachmentById(
  id: number,
  context: CustomContext
): Promise<AttachmentEntity | null> {
  return context.attachmentRepository.getAttachmentById(id)
}

export async function getAttachmentsByIds(
  ids: number[],
  context: CustomContext
): Promise<AttachmentEntity[]> {
  return context.attachmentRepository.getAttachmentsByIds(ids)
}

export async function deleteAttachmentsByIds(
  ids: number[],
  context: CustomContext
): Promise<void> {
  // Get the attachment records
  const attachments =
    await context.attachmentRepository.getAttachmentsByIds(ids)

  // Extract file UUIDs from attachments
  const fileUuids = attachments.map((attachment) => attachment.fileUuid)

  // Use the `deleteFiles` function to delete files
  await deleteFiles(fileUuids)

  // Delete the attachment records from the database
  await context.attachmentRepository.deleteAttachmentsByIds(ids)
}

export async function getAttachmentByUuid(
  fileUuid: string,
  context: CustomContext
): Promise<AttachmentEntity | null> {
  return context.attachmentRepository.getAttachmentByUuid(fileUuid)
}

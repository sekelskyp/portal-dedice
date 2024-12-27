import * as fs from 'fs'

import { AttachmentEntity } from '@backend/graphql/modules/attachment/attachmentRepository'
import { storeFile } from '@backend/services/fileStorageService'
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
    fileType: input.mimetype,
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
  // For the purpose of MVP this is enough, but for improvement we could only mark files for deletion
  // and delete them in a separate process with CRON later.

  // Get the attachment records
  const attachments =
    await context.attachmentRepository.getAttachmentsByIds(ids)
  // Delete the files from the file system
  attachments.forEach((attachment) => {
    // Delete the file from the file system
    fs.unlink(attachment.filepath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err}`)
      }
    })
  })
  // Delete the attachment records from the database
  await context.attachmentRepository.deleteAttachmentsByIds(ids)
}

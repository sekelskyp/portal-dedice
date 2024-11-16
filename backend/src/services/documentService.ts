import { FileUpload } from 'graphql-upload/Upload'

import { DocumentData } from '@backend/graphql/modules/document/documentRepository'
import { CustomContext } from '@backend/types/types'

export interface CreateDocumentInput {
  file: FileUpload // Use `Promise<FileUpload>` for compatibility with async/await
  userOwnerId: number | null
  taskId: number | null
  inheritanceProcedureId: number
}

const MAX_FILE_SIZE = 25 * 1024 * 1024 // 25MB in bytes

async function encodeFileToBase64(file: FileUpload): Promise<string> {
  const { createReadStream }: FileUpload = await file
  const fileStream = createReadStream()
  let totalSize = 0

  const fileData = await new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = []

    fileStream.on('data', (chunk: Buffer) => {
      totalSize += chunk.length

      // Check if the total size exceeds the 25MB limit
      if (totalSize > MAX_FILE_SIZE) {
        reject(
          new Error(
            `File size exceeds the limit of ${MAX_FILE_SIZE / (1024 * 1024)} MB`
          )
        )
        fileStream.destroy() // Stop reading the file
        return
      }

      chunks.push(chunk)
    })

    fileStream.on('end', () => {
      resolve(Buffer.concat(chunks).toString('base64'))
    })

    fileStream.on('error', (err) => reject(err))
  })
  return fileData
}

export async function createDocument(
  input: CreateDocumentInput,
  context: CustomContext
): Promise<number> {
  const { documentRepository } = context
  const file = await input.file
  const fileData = await encodeFileToBase64(file)
  const documentData: DocumentData = {
    fileName: file.filename,
    fileType: file.mimetype,
    fileData: fileData,
    userOwnerId: input.userOwnerId || null,
    taskId: input.taskId || null,
    inheritanceProcedureId: input.inheritanceProcedureId,
  }
  const [document] = await documentRepository.createDocument(documentData)
  return document.id
}

/**
 * Retrieves a document by ID, decoding its file data from base64 if needed.
 * @param id - The document ID.
 * @param context - Custom context containing the document repository.
 * @returns The Document with decoded file data.
 */
export async function getDocumentById(id: number, context: CustomContext) {
  const { documentRepository } = context
  return await documentRepository.getDocumentById(id)
}

/**
 * Retrieves multiple documents by their IDs, decoding their file data from base64 if needed.
 * @param ids - The list of document IDs.
 * @param context - Custom context containing the document repository.
 * @returns The array of Documents with decoded file data.
 */
export async function getDocumentsByIds(ids: number[], context: CustomContext) {
  const { documentRepository } = context
  return await documentRepository.getDocumentsByIds(ids)
}

/**
 * Deletes multiple documents by their IDs.
 * @param ids - The list of document IDs to delete.
 * @param context - Custom context containing the document repository.
 * @returns void
 */
export async function deleteDocumentsByIds(
  ids: number[],
  context: CustomContext
) {
  const { documentRepository } = context
  await documentRepository.deleteDocumentsByIds(ids)
}

export async function getDocumentsByProcedureId(
  id: number,
  context: CustomContext
) {
  const { documentRepository } = context
  return await documentRepository.getDocumentsByProcedureId(id)
}

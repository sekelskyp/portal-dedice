import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

import { FILE_UPLOADS_DIR } from '@backend/config'

export interface FileInput {
  stream: NodeJS.ReadableStream
  filename: string
  mimetype: string
}

export interface StoreFileResult {
  fileUuid: string
  filePath: string
}

export async function storeFile(input: FileInput): Promise<StoreFileResult> {
  // Step 1: Generate a unique ID for the file
  const fileUuid = uuidv4() // Universally unique identifier (e.g., "550e8400-e29b-41d4-a716-446655440000")

  // Step 2: Construct the file path
  const filePath = path.join(FILE_UPLOADS_DIR, fileUuid)
  try {
    const writeStream = fs.createWriteStream(filePath)
    input.stream.pipe(writeStream)

    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve)
      writeStream.on('error', reject)
    })

    console.log(`File saved as ${filePath}`)
  } catch (error) {
    console.error(`Error saving file: ${error}`)
    throw new Error('Error saving file')
  }

  return { fileUuid, filePath }
}

export async function retrieveFile(
  fileUuid: string
): Promise<NodeJS.ReadableStream> {
  const filePath = path.join(FILE_UPLOADS_DIR, fileUuid)

  // Check if the file exists asynchronously
  try {
    fs.access(filePath, (err) => {
      if (err) {
        throw new Error(`File not found: ${filePath}`)
      }
    })
  } catch (error) {
    throw new Error(`File not found: ${filePath}`)
  }

  // Return the file as a readable stream
  return fs.createReadStream(filePath)
}

/**
 * Deletes multiple files asynchronously based on their UUIDs.
 *
 * @param uuids - Array of file UUIDs to be deleted.
 * @returns A promise that resolves once all files are processed.
 */
export async function deleteFiles(uuids: string[]): Promise<void> {
  // Construct file paths from UUIDs
  const filePaths = uuids.map((uuid) => path.join(FILE_UPLOADS_DIR, uuid))

  // Delete files in parallel
  await Promise.all(
    filePaths.map(async (filePath) => {
      try {
        fs.unlink(filePath, (error) => {
          if (error) throw error
          console.log(`Deleted file: ${filePath}`)
        })
      } catch (error) {
        // Handle file not found or other errors
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
          console.warn(`File not found: ${filePath}`)
        } else {
          console.error(`Error deleting file ${filePath}:`, error)
        }
      }
    })
  )
}

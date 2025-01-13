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

// Define custom error for file operations
export class FileError extends Error {
  constructor(
    message: string,
    public readonly details?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'FileError'
  }
}

// Function to store a file
export async function storeFile(input: FileInput): Promise<StoreFileResult> {
  const fileUuid = uuidv4()
  const filePath = path.join(FILE_UPLOADS_DIR, fileUuid)

  try {
    // Ensure the uploads directory exists
    await fs.promises.mkdir(FILE_UPLOADS_DIR, { recursive: true })

    // Write the file to disk
    const writeStream = fs.createWriteStream(filePath)
    input.stream.pipe(writeStream)

    await new Promise<void>((resolve, reject) => {
      writeStream.on('finish', resolve)
      writeStream.on('error', (err: NodeJS.ErrnoException) =>
        reject(new FileError('Error writing file', { error: err }))
      )
    })

    return { fileUuid, filePath }
  } catch (error) {
    if (error instanceof Error) {
      throw new FileError('Failed to store file', { originalError: error })
    }
    throw error // Ensure untyped errors are still propagated
  }
}

// Function to retrieve a file
export async function retrieveFile(
  fileUuid: string
): Promise<NodeJS.ReadableStream> {
  const filePath = path.join(FILE_UPLOADS_DIR, fileUuid)

  try {
    // Check if the file exists
    await fs.promises.access(filePath)

    // Return the file as a readable stream
    return fs.createReadStream(filePath)
  } catch (error) {
    if (
      error instanceof Error &&
      (error as NodeJS.ErrnoException).code === 'ENOENT'
    ) {
      throw new FileError('File not found', { fileUuid })
    }
    if (error instanceof Error) {
      throw new FileError('Failed to retrieve file', { originalError: error })
    }
    throw error
  }
}

// Function to delete files
export async function deleteFiles(uuids: string[]): Promise<void> {
  const filePaths = uuids.map((uuid) => path.join(FILE_UPLOADS_DIR, uuid))

  await Promise.all(
    filePaths.map(async (filePath) => {
      try {
        // Delete file asynchronously
        await fs.promises.unlink(filePath)
      } catch (error) {
        if (
          error instanceof Error &&
          (error as NodeJS.ErrnoException).code === 'ENOENT'
        ) {
          // File not found, ignore
          return
        }
        if (error instanceof Error) {
          throw new FileError('Failed to delete file', {
            filePath,
            originalError: error,
          })
        }
        throw error
      }
    })
  )
}

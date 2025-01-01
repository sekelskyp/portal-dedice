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
      writeStream.on('error', (error) => {
        console.error(`Error writing file: ${error}`)
        reject(new Error('Error writing file'))
      })
    })

    console.log(`File saved successfully: ${filePath}`)
    return { fileUuid, filePath }
  } catch (error) {
    console.error(`Error storing file: ${error}`)
    throw new Error('Failed to store file')
  }
}

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
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      console.error(`File not found: ${filePath}`)
      throw new Error('File not found')
    } else {
      console.error(`Error retrieving file: ${error}`)
      throw new Error('Failed to retrieve file')
    }
  }
}

export async function deleteFiles(uuids: string[]): Promise<void> {
  const filePaths = uuids.map((uuid) => path.join(FILE_UPLOADS_DIR, uuid))

  await Promise.all(
    filePaths.map(async (filePath) => {
      try {
        // Delete file asynchronously
        await fs.promises.unlink(filePath)
        console.log(`Deleted file: ${filePath}`)
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
          console.warn(`File not found: ${filePath}`)
        } else {
          console.error(`Error deleting file ${filePath}:`, error)
        }
      }
    })
  )
}

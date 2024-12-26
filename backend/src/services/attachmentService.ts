import { storeFile } from '@backend/services/fileStorageService'
import { CustomContext } from '@backend/types/types'

export interface FileInput {
  stream: NodeJS.ReadableStream
  filename: string
}

export async function createAttachment(
  input: FileInput,
  context: CustomContext
): Promise<string> {
    const storeFileInput = {
    stream: input.stream,
    filename: input.filename,
    mimetype: input.mimetype,
    
  const fileUuid = await storeFile(input)
  return fileUuid
}

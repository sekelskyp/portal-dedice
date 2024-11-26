import { useState } from 'react'
import { FileUploadFileChangeDetails } from '@chakra-ui/react'

import { toaster } from '@frontend/shared/design-system'

const MAX_FILE_SIZE = 25000000
const TOAST_DURATION = 5000
const MAX_FILE_COUNT = 1
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

export function useDocumentUpload() {
  const [{ files }, setState] = useState<{ files: File[] }>({ files: [] })

  const handleFileUpload = (details: FileUploadFileChangeDetails) => {
    const { acceptedFiles, rejectedFiles } = details

    if (rejectedFiles.length > 0) {
      const file = rejectedFiles[0].file as File
      if (!file) {
        toaster.create({
          title: 'Soubor je poškozený nebo neplatný.',
          type: 'error',
          duration: TOAST_DURATION,
        })
      } else if (file.size > MAX_FILE_SIZE) {
        toaster.create({
          title: 'Soubor je příliš velký. Maximální velikost je 25 MB.',
          type: 'error',
          duration: TOAST_DURATION,
        })
      } else if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        toaster.create({
          title:
            'Soubor má neplatný formát. Povolené formáty jsou .pdf a .docx.',
          type: 'error',
          duration: TOAST_DURATION,
        })
      } else {
        toaster.create({
          title: 'Při vložení souboru došlo k neočekávané chybě.',
          type: 'error',
          duration: TOAST_DURATION,
        })
        return
      }
    } else if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0] as File
      if (
        file &&
        ACCEPTED_FILE_TYPES.includes(file.type) &&
        file.size <= MAX_FILE_SIZE
      ) {
        setState({ files: [file] })
        toaster.create({
          title: 'Soubor byl úspěsně vložen.',
          type: 'success',
          duration: TOAST_DURATION,
        })
      } else {
        toaster.create({
          title: 'Při vložení souboru došlo k neočekávané chybě.',
          type: 'error',
          duration: TOAST_DURATION,
        })
      }
    }
  }

  const clearFiles = () => {
    setState({ files: [] })
  }

  return {
    files,
    handleFileUpload,
    clearFiles,
    ACCEPTED_FILE_TYPES,
    MAX_FILE_SIZE,
    MAX_FILE_COUNT,
  }
}

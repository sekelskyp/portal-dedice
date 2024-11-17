import { useState } from 'react'
import { FileUploadFileChangeDetails } from '@chakra-ui/react'

import { toaster } from '@frontend/shared/design-system'

export function useDocumentUpload() {
  const [{ files }, setState] = useState<{ files: File[] }>({ files: [] })

  const acceptedFileTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]

  const handleFileUpload = (details: FileUploadFileChangeDetails) => {
    const { acceptedFiles, rejectedFiles } = details

    if (rejectedFiles.length > 0) {
      toaster.create({
        title: 'Nahrání souboru se nezdařilo.',
        type: 'error',
        duration: 5000,
      })
      return
    }
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0] as File
      if (
        file &&
        acceptedFileTypes.includes(file.type) &&
        file.size <= 25000000
      ) {
        setState({ files: [file] })
        toaster.create({
          title: 'Soubor byl úspěšně nahrán.',
          type: 'success',
          duration: 5000,
        })
      } else {
        toaster.create({
          title: 'Nahrání souboru se nezdařilo.',
          type: 'error',
          duration: 5000,
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
    acceptedFileTypes,
  }
}

import { useState } from 'react'
import { FileUploadFileChangeDetails } from '@chakra-ui/react'

import { toaster } from '@frontend/shared/design-system'

const MAX_FILE_SIZE = 10000000
const TOAST_DURATION = 5000
const MAX_FILE_COUNT = 1
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg']
const MIN_IMAGE_WIDTH = 400

const checkImageDimensions = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = URL.createObjectURL(file)
    img.onload = () => {
      resolve(img.width >= MIN_IMAGE_WIDTH)
    }
  })
}

export function useCoverUpload() {
  const [{ files }, setState] = useState<{ files: File[] }>({ files: [] })

  const handleCoverUpload = async (details: FileUploadFileChangeDetails) => {
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
          title: 'Soubor je příliš velký. Maximální velikost je 10 MB.',
          type: 'error',
          duration: TOAST_DURATION,
        })
      } else if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        toaster.create({
          title: 'Soubor má neplatný formát. Povolené formáty jsou JPG a PNG.',
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
        const isValidDimensions = await checkImageDimensions(file)
        if (isValidDimensions) {
          setState({ files: [file] })
          toaster.create({
            title: 'Soubor byl úspěsně vložen.',
            type: 'success',
            duration: TOAST_DURATION,
          })
        } else {
          toaster.create({
            title:
              'Obrázek je příliš malý. Zvolete prosím obrázek s minimální šířkou 400 px.',
            type: 'error',
            duration: TOAST_DURATION,
          })
        }
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
    handleCoverUpload,
    clearFiles,
    ACCEPTED_FILE_TYPES,
    MAX_FILE_SIZE,
    MAX_FILE_COUNT,
  }
}

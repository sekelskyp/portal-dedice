import { useCallback, useState } from 'react'
import { Box, FileUploadFileChangeDetails, Stack } from '@chakra-ui/react'
import { FaFileUpload } from 'react-icons/fa'

import {
  Alert,
  Button,
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
  toaster,
} from '@frontend/shared/design-system/atoms/chakra'

import { useProceedingContext } from '../../proceeding/components/ProceedingLayout'
import { useDocumentUpload } from '../hooks/useDocumentUpload'
import { useUploadDocument } from '../hooks/useUploadDocument'

export function DocumentUpload() {
  const [showEmptyFilesAlert, setShowEmptyFilesAlert] = useState(false)

  const { proceedingId } = useProceedingContext()

  const {
    files,
    handleFileUpload,
    clearFiles,
    ACCEPTED_FILE_TYPES,
    MAX_FILE_SIZE,
    MAX_FILE_COUNT,
  } = useDocumentUpload()

  const [createDocumentRequest, createDocumentRequestState] =
    useUploadDocument()

  const handleDataChange = useCallback(
    (details: FileUploadFileChangeDetails) => {
      handleFileUpload(details)
      setShowEmptyFilesAlert(false)
    },
    [handleFileUpload]
  )

  const handleDataClear = useCallback(() => {
    clearFiles()
    setShowEmptyFilesAlert(false)
    createDocumentRequestState.reset()
    toaster.create({
      title: 'Vložená příloha byla odebrána.',
      type: 'warning',
      duration: 5000,
    })
  }, [clearFiles, createDocumentRequestState])

  const handleUpload = useCallback(async () => {
    createDocumentRequestState.reset()
    if (files.length === 0) {
      setShowEmptyFilesAlert(true)
      return
    }
    setShowEmptyFilesAlert(false)
    for (const file of files) {
      await createDocumentRequest({
        variables: {
          data: {
            file: file,
            proceedingId: proceedingId.toString(),
          },
        },
      })
    }
  }, [createDocumentRequest, proceedingId, files, createDocumentRequestState])

  return (
    <Box width="100%">
      <FileUploadRoot
        alignItems="stretch"
        maxFiles={MAX_FILE_COUNT}
        maxFileSize={MAX_FILE_SIZE}
        accept={ACCEPTED_FILE_TYPES}
        onFileChange={handleDataChange}
      >
        <FileUploadDropzone
          label="Soubor lze vložit kliknutím nebo přetažením do této oblasti."
          description=".pdf, .docx (max. 25 MB)"
        />
        <FileUploadList
          files={files}
          clearable
          onDelete={handleDataClear}
          showSize
        />
      </FileUploadRoot>
      <Stack mt={4} alignItems="center">
        <Button
          onClick={handleUpload}
          w="1/2"
          textAlign="center"
          loading={createDocumentRequestState.loading}
          loadingText="Probíhá nahrávání přílohy..."
        >
          Nahrát vloženou přílohu <FaFileUpload />
        </Button>
        {showEmptyFilesAlert && (
          <Alert
            status="error"
            width="fit-content"
            alignItems="center"
            title="Pro nahrání přílohy je nutné vložit soubor."
          />
        )}
        {!showEmptyFilesAlert && createDocumentRequestState.error && (
          <Alert
            status="error"
            width="fit-content"
            alignItems="center"
            title={createDocumentRequestState.error.message}
          />
        )}
      </Stack>
    </Box>
  )
}

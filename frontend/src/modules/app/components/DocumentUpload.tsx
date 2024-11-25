import { useCallback, useState } from 'react'
import { Box, FileUploadFileChangeDetails, Stack } from '@chakra-ui/react'
import { FaFileUpload } from 'react-icons/fa'
import { useParams } from 'react-router-dom'

import {
  Alert,
  Button,
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
  toaster,
} from '@frontend/shared/design-system/atoms/chakra'

import { useCreateDocument } from '../hooks/useCreateDocument'
import { useDocumentUpload } from '../hooks/useDocumentUpload'
import { useProceeding } from '../hooks/useProceeding'

export function DocumentUpload() {
  const { id } = useParams()
  const [showEmptyFilesAlert, setShowEmptyFilesAlert] = useState(false)

  const { data } = useProceeding({
    proceedingId: parseInt(id ?? '0', 10),
  })

  const { files, handleFileUpload, clearFiles, ACCEPTED_FILE_TYPES } =
    useDocumentUpload()

  const [createDocumentRequest, createDocumentRequestState] =
    useCreateDocument()

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
            inheritanceProcedureId:
              data?.getProcedureById?.id?.toString() ?? '',
          },
        },
      })
    }
  }, [createDocumentRequest, data, files, createDocumentRequestState])

  return (
    <Box width="100%">
      <FileUploadRoot
        alignItems="stretch"
        maxFiles={1}
        maxFileSize={25000000}
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

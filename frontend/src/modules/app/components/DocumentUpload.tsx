import { useCallback } from 'react'
import { Box, Button, Stack } from '@chakra-ui/react'
import { FaFileUpload } from 'react-icons/fa'

import {
  FileUploadDropzone,
  FileUploadItem,
  FileUploadList,
  FileUploadRoot,
} from '@frontend/shared/design-system/atoms/chakra'

import { useCreateDocument } from '../hooks/useCreateDocument'
import { useDocumentUpload } from '../hooks/useDocumentUpload'

export function DocumentUpload() {
  const { files, handleFileUpload, clearFiles, acceptedFileTypes } =
    useDocumentUpload()

  console.log(files)
  console.log()

  const [createDocumentRequest, createDocumentRequestState] =
    useCreateDocument()

  const handleUpload = useCallback(async () => {
    for (const file of files) {
      await createDocumentRequest({
        variables: {
          data: {
            file: file,
            filename: file.name,
            inheritanceProcedureId: '1',
          },
        },
      })
    }
  }, [createDocumentRequest, files])

  return (
    <Box width="100%">
      <FileUploadRoot
        alignItems="stretch"
        maxFiles={1}
        maxFileSize={25000000}
        accept={acceptedFileTypes}
        onFileChange={handleFileUpload}
      >
        <FileUploadDropzone
          label="Soubor lze vložit kliknutím nebo přetažením do této oblasti."
          description=".pdf, .docx (max. 25 MB)"
        />
        <FileUploadList clearable>
          {files.map((file) => (
            <FileUploadItem key={file.name} file={file} onDelete={clearFiles} />
          ))}
        </FileUploadList>
      </FileUploadRoot>
      <Stack mt={4} alignItems="center">
        <Button onClick={handleUpload} w="1/2" textAlign="center">
          Nahrát přílohu <FaFileUpload />
        </Button>
        {createDocumentRequestState.loading && <p>Probíhá nahrávání...</p>}
        {createDocumentRequestState.error && <div> Chyba.</div>}
      </Stack>
    </Box>
  )
}

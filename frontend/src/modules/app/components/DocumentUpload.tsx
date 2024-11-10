import {
  FileUploadDropzone,
  FileUploadItem,
  FileUploadList,
  FileUploadRoot,
} from '@frontend/shared/design-system/atoms/chakra'

import { useDocumentUpload } from '../hooks/useDocumentUpload'

export function DocumentUpload() {
  const { files, handleFileUpload, clearFiles, acceptedFileTypes } =
    useDocumentUpload()

  return (
    <FileUploadRoot
      maxW="xl"
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
  )
}

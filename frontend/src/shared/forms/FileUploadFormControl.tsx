import { FileUploadFileChangeDetails } from '@chakra-ui/react'

import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from '../design-system/atoms/chakra/file-button'

import { BaseFieldControl, BaseFieldControlProps } from './BaseFieldControl'

export interface FileUploadControlProps extends BaseFieldControlProps {
  accept?: string | string[]
  multiple?: boolean
  dropzoneLabel?: React.ReactNode
  dropzoneDescription?: React.ReactNode
  height?: string | number
  width?: string | number
  maxFileSize?: number
  maxFiles?: number
  onFileChange?: (details: FileUploadFileChangeDetails) => void
  files?: File[]
  onDelete?: (file: File) => void
  onFileRejection?: (details: FileUploadFileChangeDetails) => void
}

export const FileUploadFormControl = ({
  accept,
  multiple = false,
  dropzoneLabel,
  dropzoneDescription,
  height,
  width,
  maxFileSize,
  maxFiles,
  onFileChange,
  files: externalFiles,
  onDelete: externalOnDelete,
  onFileRejection,
  ...props
}: FileUploadControlProps) => {
  return (
    <BaseFieldControl {...props}>
      {(field, disabled) => {
        const files = externalFiles ?? (field.value ? [field.value] : [])

        const handleFileChange = (details: FileUploadFileChangeDetails) => {
          if (details.rejectedFiles.length > 0) {
            onFileRejection?.(details)
            return
          }
          const newFiles = details.acceptedFiles
          field.onChange(multiple ? newFiles : newFiles[0])
          onFileChange?.(details)
        }

        const handleDelete = (file: File) => {
          field.onChange(multiple ? [] : null)
          externalOnDelete?.(file)
        }

        return (
          <FileUploadRoot
            accept={accept}
            maxFileSize={maxFileSize}
            maxFiles={maxFiles}
            onFileChange={handleFileChange}
          >
            <FileUploadDropzone
              label={dropzoneLabel}
              description={dropzoneDescription}
              height={height}
              width={width}
            />
            <FileUploadList
              showSize
              clearable
              files={files}
              onDelete={handleDelete}
              style={{ wordBreak: 'break-word' }}
            />
          </FileUploadRoot>
        )
      }}
    </BaseFieldControl>
  )
}

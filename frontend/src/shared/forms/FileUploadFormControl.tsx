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
  files,
  onDelete,
  ...props
}: FileUploadControlProps) => {
  return (
    <BaseFieldControl {...props}>
      {(field, disabled) => (
        <FileUploadRoot
          accept={accept}
          maxFileSize={maxFileSize}
          maxFiles={maxFiles}
          onFileChange={onFileChange}
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
            onDelete={onDelete}
          />
        </FileUploadRoot>
      )}
    </BaseFieldControl>
  )
}

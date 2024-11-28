import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from '../design-system/atoms/chakra/file-button'

import { BaseFieldControl, BaseFieldControlProps } from './BaseFieldControl'

export interface FileUploadControlProps extends BaseFieldControlProps {
  accept?: string
  multiple?: boolean
  dropzoneLabel?: React.ReactNode
  dropzoneDescription?: React.ReactNode
  height?: string | number
  width?: string | number
}

export const FileUploadFormControl = ({
  accept,
  multiple = false,
  dropzoneLabel,
  dropzoneDescription,
  height,
  width,
  ...props
}: FileUploadControlProps) => {
  return (
    <BaseFieldControl {...props}>
      {(field, disabled) => (
        <FileUploadRoot
          accept={accept}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const files = event.target.files
            if (files) {
              field.onChange(multiple ? files : files[0])
            }
          }}
        >
          <FileUploadDropzone
            label={dropzoneLabel}
            description={dropzoneDescription}
            height={height}
            width={width}
          />
          <FileUploadList showSize clearable />
        </FileUploadRoot>
      )}
    </BaseFieldControl>
  )
}

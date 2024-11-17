import { Textarea } from '@chakra-ui/react'

import { BaseFieldControl, BaseFieldControlProps } from './BaseFieldControl'

export interface TextAreaControlProps extends BaseFieldControlProps {
  placeholder?: string
  height?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export const TextAreaFormControl = ({
  placeholder,
  size,
  height,
  ...props
}: TextAreaControlProps) => {
  return (
    <BaseFieldControl {...props}>
      {(field, disabled) => (
        <Textarea
          {...field}
          value={field.value || ''}
          disabled={disabled}
          placeholder={placeholder}
          size={size}
          height={height}
        />
      )}
    </BaseFieldControl>
  )
}

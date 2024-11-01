import { Input } from '@chakra-ui/react'

import { BaseFieldControl, BaseFieldControlProps } from './BaseFieldControl'

export interface InputControlProps extends BaseFieldControlProps {
  type?: string
  placeholder?: string
}

export const InputFormControl = ({
  type,
  placeholder,
  ...props
}: InputControlProps) => {
  return (
    <BaseFieldControl {...props}>
      {(field, disabled) => (
        <Input
          {...props}
          {...field}
          value={field.value || ''}
          disabled={disabled}
          type={type}
          placeholder={placeholder}
        />
      )}
    </BaseFieldControl>
  )
}

import { Input } from '@chakra-ui/react'

import { BaseFieldControl, BaseFieldControlProps } from './BaseFieldControl'

export interface InputControlProps extends BaseFieldControlProps {
  type?: string
  placeholder?: string
  onChange?: (value: string) => void
}

export const InputFormControl = ({
  type,
  placeholder,
  onChange,
  ...props
}: InputControlProps) => {
  return (
    <BaseFieldControl {...props}>
      {(field, disabled) => (
        <Input
          {...field}
          onChange={(e) => {
            field.onChange(e.target.value)
            onChange?.(e.target.value)
          }}
          value={field.value || ''}
          disabled={disabled}
          type={type}
          placeholder={placeholder}
        />
      )}
    </BaseFieldControl>
  )
}

import { Input, InputProps } from '@chakra-ui/react'

import { BaseFieldControl, BaseFieldControlProps } from './BaseFieldControl'

export interface InputControlProps extends BaseFieldControlProps {
  placeholder?: string
  onChange?: (value: string) => void
  inputProps?: InputProps
}

export const InputFormControl = ({
  placeholder,
  onChange,
  inputProps,
  ...props
}: InputControlProps) => {
  return (
    <BaseFieldControl {...props}>
      {(field, disabled) => (
        <Input
          {...field}
          {...inputProps}
          onChange={(e) => {
            field.onChange(e.target.value)
            onChange?.(e.target.value)
          }}
          value={field.value || ''}
          disabled={disabled}
          placeholder={placeholder}
        />
      )}
    </BaseFieldControl>
  )
}

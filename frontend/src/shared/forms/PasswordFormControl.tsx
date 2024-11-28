import { InputProps } from '@chakra-ui/react'

import { PasswordInput } from '../design-system/atoms/chakra'

import { BaseFieldControl, BaseFieldControlProps } from './BaseFieldControl'

export interface PasswordControlProps extends BaseFieldControlProps {
  placeholder?: string
  onChange?: (value: string) => void
  inputProps?: InputProps
}

export const PasswordFormControl = ({
  placeholder,
  onChange,
  inputProps,
  ...props
}: PasswordControlProps) => {
  return (
    <BaseFieldControl {...props}>
      {(field, disabled) => (
        <PasswordInput
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

import { ReactNode } from 'react'
import { FieldErrorText } from '@chakra-ui/react'
import {
  ControllerRenderProps,
  FieldValues,
  useController,
} from 'react-hook-form'

import { Field } from '../design-system'

export interface BaseFieldControlProps {
  name: string
  label?: ReactNode
  disabled?: boolean
  required?: boolean
}

export const BaseFieldControl = ({
  children,
  name,
  label,
  disabled,
  required,
}: BaseFieldControlProps & {
  children: (
    field: ControllerRenderProps<FieldValues, string>,
    disabled?: boolean
  ) => ReactNode
}) => {
  const field = useController({
    name,
  })

  const {
    fieldState: { error },
  } = field

  const fieldDisabled = !!disabled || field.formState.isSubmitting

  return (
    <Field invalid={!!error} label={label} required={required}>
      {children(field.field, fieldDisabled)}
      <FieldErrorText>{error?.message}</FieldErrorText>
    </Field>
  )
}

import { ReactNode, useContext } from 'react'
import {
  ControllerRenderProps,
  FieldValues,
  useController,
} from 'react-hook-form'

import { Field, FieldProps, Skeleton } from '../design-system'

import { loadingContext } from '.'

export interface BaseFieldControlProps
  extends Omit<
    FieldProps,
    | 'children'
    | 'onChange'
    | 'onBlur'
    | 'defaultValue'
    | 'ids'
    | 'orientation'
    | 'color'
    | 'content'
    | 'translate'
  > {
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
  ...rest
}: BaseFieldControlProps & {
  children: (
    field: ControllerRenderProps<FieldValues, string>,
    disabled?: boolean
  ) => ReactNode
}) => {
  const field = useController({
    name,
  })

  const loading = useContext(loadingContext)

  const {
    fieldState: { error },
  } = field

  const fieldDisabled = !!disabled || field.formState.isSubmitting

  return (
    <Field
      invalid={!!error}
      errorText={error?.message}
      helperText={rest.helperText}
      label={label}
      required={required}
      {...rest}
    >
      <Skeleton loading={loading} w="full">
        {children(field.field, fieldDisabled)}
      </Skeleton>
    </Field>
  )
}

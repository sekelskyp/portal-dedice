import { DateInput, DateInputProps } from '../components/DateInput'

import { BaseFieldControl, BaseFieldControlProps } from './BaseFieldControl'

export interface DateFromControlProps
  extends BaseFieldControlProps,
    DateInputProps {}

export const DateFormControl = ({
  showTime,
  ...rest
}: DateFromControlProps) => (
  <BaseFieldControl {...rest}>
    {(field, disabled) => (
      <DateInput
        {...field}
        onChange={(value) => {
          console.log('value', value)
          field.onChange(value)
          console.log('field', field.value)
        }}
        disabled={disabled}
      />
    )}
  </BaseFieldControl>
)

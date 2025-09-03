import { DateInput, DateInputProps } from '../ui/date-input'

import { BaseFieldControl, BaseFieldControlProps } from './base-field-control'

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
          field.onChange(value)
        }}
        disabled={disabled}
      />
    )}
  </BaseFieldControl>
)

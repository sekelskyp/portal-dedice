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
    {(field, disabled) => <DateInput {...field} disabled={disabled} />}
  </BaseFieldControl>
)

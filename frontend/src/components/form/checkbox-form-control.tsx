import { Checkbox, CheckboxProps } from '@components/ui'

import { BaseFieldControl, BaseFieldControlProps } from './base-field-control'

export interface CheckboxControlProps extends BaseFieldControlProps {
  onChange?: (value: boolean) => void
  checkboxProps?: CheckboxProps
}

export const CheckboxFormControl = ({
  onChange,
  checkboxProps,
  label,
  ...props
}: CheckboxControlProps) => {
  return (
    <BaseFieldControl {...props}>
      {(field, disabled) => (
        <Checkbox
          {...field}
          {...checkboxProps}
          onCheckedChange={({ checked }) => field.onChange(checked)}
          checked={field.value}
          disabled={disabled}
        >
          {label}
        </Checkbox>
      )}
    </BaseFieldControl>
  )
}

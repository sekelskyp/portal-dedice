import { Switch, SwitchProps } from '../design-system/atoms/chakra'

import { BaseFieldControl, BaseFieldControlProps } from './BaseFieldControl'

export interface SwitchControlProps extends BaseFieldControlProps {
  onChange?: (value: boolean) => void
  switchProps?: SwitchProps
}

export const SwitchFormControl = ({
  onChange,
  switchProps,
  ...props
}: SwitchControlProps) => {
  return (
    <BaseFieldControl {...props}>
      {(field, disabled) => (
        <Switch
          {...field}
          {...switchProps}
          onCheckedChange={(e) => {
            field.onChange(e.checked)
            onChange?.(e.checked)
          }}
          checked={field.value || false}
          disabled={disabled}
        />
      )}
    </BaseFieldControl>
  )
}

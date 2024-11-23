import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectRootProps,
  SelectTrigger,
  SelectValueText,
} from '../design-system'

import { BaseFieldControl, BaseFieldControlProps } from './BaseFieldControl'

export interface SelectControlProps
  extends Omit<SelectRootProps, 'name'>,
    BaseFieldControlProps {
  placeholder?: string
}

export const SelectFormControl = (props: SelectControlProps) => {
  const { children, placeholder, ...rest } = props

  const multiple = rest.multiple

  return (
    <BaseFieldControl {...rest}>
      {({ value, onChange, onBlur }, disabled) => (
        <SelectRoot
          value={multiple ? value || [] : value ? [value] : []}
          onValueChange={({ value }) => onChange(multiple ? value : value[0])}
          onBlur={onBlur}
          {...rest}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValueText placeholder={placeholder}>
              {(items) => items.map((i) => i.label).join(', ')}
            </SelectValueText>
          </SelectTrigger>
          <SelectContent>
            {rest.collection.items.map((item) => (
              <SelectItem item={item} key={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      )}
    </BaseFieldControl>
  )
}

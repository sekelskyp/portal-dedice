import { FormEvent } from 'react'

import { Radio } from '@frontend/shared/design-system'
import { RadioGroupFormControl } from '@frontend/shared/forms'

interface BinaryRadioGroupProps {
  name: string
  label: string
  disabled?: boolean
  required?: boolean
  onChange?: (event: FormEvent<HTMLDivElement>) => void
  radioNegative?: { label: string; value: string }
  radioPositive?: { label: string; value: string }
}

export const BinaryRadioGroup = ({
  name,
  label,
  disabled,
  required,
  onChange,
  radioPositive = { label: 'Ano', value: 'yes' },
  radioNegative = { label: 'Ne', value: 'no' },
}: BinaryRadioGroupProps) => (
  <RadioGroupFormControl
    name={name}
    label={label}
    required={required}
    disabled={disabled}
    onChange={onChange}
  >
    <Radio value={radioPositive.value}>{radioPositive.label}</Radio>
    <Radio value={radioNegative.value}>{radioNegative.label}</Radio>
  </RadioGroupFormControl>
)

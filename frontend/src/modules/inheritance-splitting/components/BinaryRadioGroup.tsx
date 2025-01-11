import { Radio } from '@frontend/shared/design-system'
import { RadioGroupFormControl } from '@frontend/shared/forms'

interface BinaryRadioGroupProps {
  name: string
  label: string
  disabled?: boolean
  required?: boolean
  radioNegative?: { label: string; value: string }
  radioPositive?: { label: string; value: string }
}

export const BinaryRadioGroup = ({
  name,
  label,
  disabled,
  required,
  radioPositive = { label: 'Ano', value: 'ano' },
  radioNegative = { label: 'Ne', value: 'ne' },
}: BinaryRadioGroupProps) => (
  <RadioGroupFormControl
    name={name}
    label={label}
    required={required}
    disabled={disabled}
  >
    <Radio value={radioPositive.value}>{radioPositive.label}</Radio>
    <Radio value={radioNegative.value}>{radioNegative.label}</Radio>
  </RadioGroupFormControl>
)

import { RadioGroupFormControl } from '@components/form/radio-group-form-control'
import { Radio } from '@components/ui/radio'

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

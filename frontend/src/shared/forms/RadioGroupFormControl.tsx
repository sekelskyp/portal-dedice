import { FC } from 'react'
import { HStack } from '@chakra-ui/react'

import { RadioGroup, RadioGroupProps } from '../design-system'

import { BaseFieldControl, BaseFieldControlProps } from './BaseFieldControl'

export interface RadioGroupControlProps
  extends RadioGroupProps,
    BaseFieldControlProps {
  name: string
}

export const RadioGroupFormControl: FC<RadioGroupControlProps> = ({
  children,
  ...props
}: RadioGroupControlProps) => {
  return (
    <BaseFieldControl {...props}>
      {({ value, onChange, onBlur }, disabled) => (
        <RadioGroup
          value={value}
          onValueChange={(value) => onChange(value.value)}
          onBlur={onBlur}
          {...props}
          disabled={disabled}
          alignSelf="start"
          asChild
        >
          <HStack gap={4}>{children}</HStack>
        </RadioGroup>
      )}
    </BaseFieldControl>
  )
}

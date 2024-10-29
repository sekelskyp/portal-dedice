import { Circle, Stack, Text, useBreakpointValue } from '@chakra-ui/react'
import { FiCheck } from 'react-icons/fi'

interface StepperCategoryProps {
  step: number
  index: number
}

export function StepperCategory({ step, index }: StepperCategoryProps) {
  const iconBreakpoints = useBreakpointValue({
    base: '16px',
    sm: '20px',
    md: '24px',
  })

  const avatarBreakpoints = useBreakpointValue({
    base: '24px',
    sm: '36px',
    md: '48px',
  })

  return (
    <Stack direction="column" alignItems="center">
      <Circle
        size={avatarBreakpoints}
        bg={step > index ? 'blue.solid' : 'gray.emphasized'}
        color="bg"
      >
        {step > index ? (
          <FiCheck size={iconBreakpoints} />
        ) : (
          <Text fontSize={iconBreakpoints}>{index}</Text>
        )}
      </Circle>
    </Stack>
  )
}

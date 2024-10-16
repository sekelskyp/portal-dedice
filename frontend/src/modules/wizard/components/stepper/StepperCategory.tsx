import { Circle, Stack, Text } from '@chakra-ui/react'
import { FiCheck } from 'react-icons/fi'

interface StepperCategoryProps {
  step: number
  index: number
}

export function StepperCategory({ step, index }: StepperCategoryProps) {
  return (
    <Stack direction="column" alignItems="center">
      <Circle
        size="48px"
        bg={step > index ? 'blue.500' : 'gray.300'}
        color="white"
      >
        {step > index ? (
          <FiCheck size="24px" />
        ) : (
          <Text fontSize="24px">{index}</Text>
        )}
      </Circle>
    </Stack>
  )
}

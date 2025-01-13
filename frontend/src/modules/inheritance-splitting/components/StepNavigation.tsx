import { Button, HStack } from '@chakra-ui/react'

interface StepNavigationProps {
  onPrevious: () => void
  onNext: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

export const StepNavigation = ({
  onPrevious,
  onNext,
  isFirstStep,
  isLastStep,
}: StepNavigationProps) => {
  return (
    <HStack justify="space-between" width="100%" mt={4}>
      <Button
        onClick={onPrevious}
        visibility={isFirstStep ? 'hidden' : 'visible'}
      >
        Předchozí krok
      </Button>
      <Button onClick={onNext}>{isLastStep ? 'Dokončit' : 'Další krok'}</Button>
    </HStack>
  )
}

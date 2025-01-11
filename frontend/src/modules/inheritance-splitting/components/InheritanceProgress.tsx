import { Box, Container } from '@chakra-ui/react'

import { StepperCategory } from '@frontend/modules/wizard/components/stepper/StepperCategory'

import { InheritanceProgressBar } from './InheritanceProgressBar'

interface InheritanceProgressProps {
  currentStep: number
}

export function InheritanceProgress({ currentStep }: InheritanceProgressProps) {
  const calculateProgress = (step: number, targetStep: number) => {
    return step >= targetStep ? 100 : 0
  }

  return (
    <Container maxW="6xl">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mt={8}
        //mx={{ base: 4, sm: 8, md: 16 }}
      >
        <StepperCategory step={currentStep} index={1} />
        <InheritanceProgressBar progress={calculateProgress(currentStep, 2)} />
        <StepperCategory step={currentStep} index={2} />
        <InheritanceProgressBar progress={calculateProgress(currentStep, 3)} />
        <StepperCategory step={currentStep} index={3} />
        <InheritanceProgressBar progress={calculateProgress(currentStep, 4)} />
        <StepperCategory step={currentStep} index={4} />
      </Box>
    </Container>
  )
}

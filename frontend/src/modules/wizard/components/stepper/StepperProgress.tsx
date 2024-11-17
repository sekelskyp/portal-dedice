import { Box } from '@chakra-ui/react'

import { StepperCategory } from './StepperCategory'
import { StepperProgressBar } from './StepperProgressBar'

interface StepperProgressProps {
  step: number
  questionsProgress: number
  questionnaireProgress: number
}

export function StepperProgress({
  step,
  questionsProgress,
  questionnaireProgress,
}: StepperProgressProps) {
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        m={4}
      >
        <StepperCategory step={step} index={1} />
        <StepperProgressBar progress={questionsProgress} />
        <StepperCategory step={step} index={2} />
        <StepperProgressBar progress={questionnaireProgress} />
        <StepperCategory step={step} index={3} />
      </Box>
    </>
  )
}

import { Box } from '@chakra-ui/react'

import { StepperCategory } from './StepperCategory'
import { StepperProgressBar } from './StepperProgressBar'

interface StepperProgressProps {
  step: number
  questionsProgress: number
  treeProgress: number
}

export function StepperProgress({
  step,
  questionsProgress,
  treeProgress,
}: StepperProgressProps) {
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        my="8"
      >
        <StepperCategory step={step} index={1} />
        <StepperProgressBar progress={questionsProgress} />
        <StepperCategory step={step} index={2} />
        <StepperProgressBar progress={treeProgress} />
        <StepperCategory step={step} index={3} />
      </Box>
    </>
  )
}

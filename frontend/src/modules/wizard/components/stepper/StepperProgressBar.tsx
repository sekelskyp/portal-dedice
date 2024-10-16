import { Box, Progress } from '@chakra-ui/react'

export function StepperProgressBar({ progress }: { progress: number }) {
  return (
    <Box flex="1" px={8}>
      <Progress
        value={progress}
        size="md"
        colorScheme="blue"
        borderRadius="xl"
      />
    </Box>
  )
}

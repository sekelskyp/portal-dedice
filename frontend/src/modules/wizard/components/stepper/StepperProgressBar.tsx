import { Box, Progress } from '@chakra-ui/react'

export function StepperProgressBar({ progress }: { progress: number }) {
  return (
    <Box flex="1" px={{ base: 2, sm: 4, md: 8 }}>
      <Progress
        value={progress}
        size={{ base: 'sm', md: 'md' }}
        colorScheme="blue"
        borderRadius="xl"
      />
    </Box>
  )
}

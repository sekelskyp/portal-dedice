import { Box } from '@chakra-ui/react'

import { ProgressBar, ProgressRoot } from '@frontend/shared/design-system'

export function StepperProgressBar({ progress }: { progress: number }) {
  return (
    <Box flex="1" px={{ base: 2, sm: 4, md: 8 }}>
      <ProgressRoot
        value={progress}
        size={{ base: 'sm', md: 'md' }}
        colorPalette="blue"
      >
        <ProgressBar borderRadius="md" />
      </ProgressRoot>
    </Box>
  )
}

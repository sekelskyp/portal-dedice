import { Box, Button, Container, Heading, Stack } from '@chakra-ui/react'

import { WizardStepProps } from '../stepper_props'

export function WizardStepTwelve({
  activeStep,
  setActiveStep,
}: WizardStepProps) {
  return (
    <Box>
      <Stack spacing={4} alignItems="center">
        <Container maxWidth="container.sm">
          <Heading py={6} textAlign={'center'}>
            Chcete vědět víc o možnostech rozdělení pozůstalosti?
          </Heading>
        </Container>
        <Stack direction={'row'}>
          <Button
            colorScheme="red"
            onClick={() => setActiveStep(activeStep - 1)}
          >
            Zpět
          </Button>
          <Button
            colorScheme="primary"
            onClick={() => setActiveStep(activeStep + 1)}
          >
            Ano
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

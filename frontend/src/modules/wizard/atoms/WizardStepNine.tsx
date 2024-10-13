import { Box, Button, Container, Heading, Stack } from '@chakra-ui/react'

import { WizardStepProps } from '../stepper_props'

export function WizardStepNine({ activeStep, setActiveStep }: WizardStepProps) {
  return (
    <Box>
      <Stack spacing={4} alignItems="center">
        <Container maxWidth="container.sm">
          <Heading as={'h3'} size="lg" py={6} px={12} textAlign={'center'}>
            Notář zjišťuje majetek, doptává se institucí, dělá přehled majetku.
            Dokud není zjištění kompletní, není možné pokračovat dále.
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
            Aha, mám něco dělat?
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

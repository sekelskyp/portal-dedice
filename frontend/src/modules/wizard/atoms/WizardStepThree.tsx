import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
} from '@chakra-ui/react'

import { WizardStepProps } from '../stepper_props'

import { AccordionHelper } from './AccordionHelper'

const dummy_data = [
  {
    id: 1,
    title: 'Co aplikace nabízí?',
    description: 'Tato aplikace vám srozumitelně vysvětlí, co vás v pozůstalostním řízení čeká a díky návodu zjistíte, jaké jsou možnosti rozdělení majetku v pozůstalosti.',
  },
  
]

export function WizardStepThree({ activeStep, setActiveStep }: WizardStepProps) {
  return (
    <Box>
      <Stack spacing={4} alignItems="center">
        <Container maxWidth="container.sm">
          <Heading py={6} textAlign={'center'}>Pojďte se v naší aplikaci dozvědět více o tom, co vás čeká v pozůstalostním řízení.</Heading>
          <AccordionHelper items={dummy_data} />
        </Container>
      <Stack direction={"row"}>
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
        Pokračuj
        </Button>
      </Stack>
    </Stack>
  </Box>
  )
}

import { Box, Button, Container, Heading, Stack } from '@chakra-ui/react'

import { WizardStepProps } from '../stepper_props'

import { AccordionHelper } from './AccordionHelper'

const dummy_data = [
  {
    id: 1,
    title: 'Jak dlouho trvá, než se spis dostane k notář?',
    description: 'Může to trvat až jeden měsíc.',
  },
]

export function WizardStepFour({ activeStep, setActiveStep }: WizardStepProps) {
  return (
    <Box>
      <Stack spacing={4} alignItems="center">
        <Container maxWidth="container.sm">
          <Heading as={'h3'} size="lg" py={6} px={8} textAlign={'center'}>
            Po úmrtí člověka vystaví matriční úřad umrtní list, který zasílá
            místně příslušnému soudu. Ten následně pověří dle rozvrhu práce
            příslušného notáře.
          </Heading>
          <AccordionHelper items={dummy_data} />
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
            Co se děje pak?
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

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
      title: 'Co, když je v pozůstalosti automobil?',
      description: 'Přineste s sebou velký technický průkaz vozidla.',
    },
    {
        id: 2,
        title: 'Co, když je v pozůstalosti nemovitost?',
        description: 'Bude potřeba zajistit odhad nemovitosti. Tento odhad za poplatek zpracuje kterákoliv realitní kancelář.',
      },
  ]
  
  export function WizardStepEight({ activeStep, setActiveStep }: WizardStepProps) {
    return (
      <Box>
        <Stack spacing={4} alignItems="center">
          <Container maxWidth="container.sm">
            <Heading as={"h3"} size='lg' py={6} px={12} textAlign={'center'}>S sebou si doneste doklad totožnosti, oddací list, závěť, rodné listy. Udělejte si přehled v majetkových záležitostech zůstavitele (bakovní účty apod.).</Heading>
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
          Co se děje potom?
          </Button>
        </Stack>
      </Stack>
    </Box>
    )
  }
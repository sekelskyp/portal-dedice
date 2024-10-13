import {
    Box,
    Button,
    Container,
    Heading,
    Stack,
  } from '@chakra-ui/react'

  import { WizardStepProps } from '../stepper_props'
  
  export function WizardStepSeven({ activeStep, setActiveStep }: WizardStepProps) {
    return (
      <Box>
        <Stack spacing={4} alignItems="center">
          <Container maxWidth="container.sm">
            <Heading as={"h3"} size='lg' py={6} px={12} textAlign={'center'}>Notář se Vás bude ptát na majetek, který zůstavitel vlastnil ke dni úmrtí, především na to, kde měl bankovní účty aj. majetek. Pokud měl zůstavitel v době úmrtí manželku, bude se ptát na stejné dotazy i vzhledem k její osobě.</Heading>
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
          Co si mám přinést s sebou?
          </Button>
        </Stack>
      </Stack>
    </Box>
    )
  }
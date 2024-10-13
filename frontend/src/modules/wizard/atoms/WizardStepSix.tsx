import {
    Box,
    Button,
    Container,
    Heading,
    Stack,
    Text,
  } from '@chakra-ui/react'

  import { WizardStepProps } from '../stepper_props'

  import { AccordionHelper } from './AccordionHelper'

const dummy_data = [
  {
    id: 1,
    title: 'Jak je možné, že délka řízení či rychlost notářů jsou odlišné?',
    description: 'Notáři nemají stejný počet případů a také jejich složitost a náročnost se různí. Proto se může stát, že notáři v řízení postupují s jinou rychlostí.',
  },
  {
    id: 2,
    title: 'Proč je na PŠ pozván pouze vypravitel pohřbu?',
    description: 'Jedná se o úvodní setkání s osobou nejbližší zůstaviteli. Při závěrečném řízení již budou účastni všichni dědicové.',
  },
]
  
  export function WizardStepSix({ activeStep, setActiveStep }: WizardStepProps) {
    return (
      <Box>
        <Stack spacing={4} alignItems="center">
          <Container maxWidth="container.sm">
            <Heading as={"h3"} size='lg' py={4} px={12} textAlign={'center'}>Notář by měl postupovat bezodkladně, ale záleží notář od notáře.</Heading>
            <Text py={4} px={16} textAlign={'center'}>Vyčkejte, až vás notář kontaktuje, nebo využijte naší aplikaci Online PŠ a využijte možnosti vyřešit tuto část řízení v pohodlí domova!</Text>
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
          Co přesně PŠ obnáší?
          </Button>
        </Stack>
      </Stack>
    </Box>
    )
  }
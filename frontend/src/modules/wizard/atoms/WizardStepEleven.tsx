import { Box, Button, Container, Heading, Stack, Text } from '@chakra-ui/react'

import { WizardStepProps } from '../stepper_props'

import { AccordionHelper } from './AccordionHelper'

const dummy_data = [
  {
    id: 1,
    title: 'Je možné nechat se zastoupit na plnou moc?',
    description:
      'Ano, kontaktuje v tomto případě notáře, který Vám pro tyto účely vydá speciální tiskopis plné moci. Současně Vám sdělí, zda je nutné, aby měla ověřený podpis.',
  },
]

export function WizardStepEleven({
  activeStep,
  setActiveStep,
}: WizardStepProps) {
  return (
    <Box>
      <Stack spacing={4} alignItems="center">
        <Container maxWidth="container.sm">
          <Heading as={'h3'} size="lg" py={4} px={12} textAlign={'center'}>
            Během tohoto jednání jsou přítomni všichni dědicové, vč. pozůstalé
            manželky.
          </Heading>
          <Text py={4} px={16} textAlign={'center'}>
            Cílem je, aby se tito účastníci dohodli na rozdělení majetku v
            pozůstalosti.
          </Text>
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
            Pokračuj
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

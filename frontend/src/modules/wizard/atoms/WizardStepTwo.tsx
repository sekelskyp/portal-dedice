import {
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  Stack,
  WrapItem,
} from '@chakra-ui/react'

import { WizardStepProps } from '../stepper_props'

import { AccordionHelper } from './AccordionHelper'
import { ContactInfo } from './ContactInfo'

// TO BE DELETED SOON
const dummy_data = [
  {
    id: 1,
    title: 'Mohu si vybrat jiného notáře?',
    description: 'Bohužel, změna notáře není možná.',
  },
  {
    id: 2,
    title: 'Kde je toto upraveno?',
    description:
      'Notář je určen rozvrhem práce, což je právní předpis.\nDostupný zde: https://www.nkcr.cz/seznam-notaru/rozvrhy-rizeni-o-pozustalosti',
  },
]

// TO BE DELETED SOON
const mock_data = {
  phone: '+420 222 715 217',
  email: 'zkratochvil.notar@nkcr.cz',
  address: 'Sudoměřská 32/1293, 130 00 Praha 3',
}

export function WizardStepTwo({ activeStep, setActiveStep }: WizardStepProps) {
  return (
    <Box>
      <Stack spacing={4} alignItems="center">
        <Heading as="h2" size="h2" textAlign="center">
          Váš notář
        </Heading>
        <WrapItem>
          <Avatar
            size="2xl"
            name="Segun Adebayo"
            src="https://bit.ly/dan-abramov"
            my={6}
          />
        </WrapItem>
        <Heading as="h3" size="h3" textAlign="center">
          JUDr. Zdeněk Kratochvíl
        </Heading>
        <ContactInfo contactInfo={mock_data} />
        <Container maxWidth="container.sm">
          <AccordionHelper items={dummy_data} />
        </Container>
        <Stack direction="row">
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

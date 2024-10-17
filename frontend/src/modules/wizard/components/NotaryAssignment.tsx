import {
  Avatar,
  Box,
  Container,
  Heading,
  Stack,
  WrapItem,
} from '@chakra-ui/react'

import { AccordionHelper } from './accordion/AccordionHelper'
import { ContactInfo } from './contact/ContactInfo'

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

export function NotaryAssignment() {
  return (
    <Box>
      <Heading
        size={{ base: 'sm', sm: 'md', md: 'lg', lg: 'xl' }}
        textAlign="center"
      >
        Na základě vyplněných údajů vám byl přidělen následující notář:
      </Heading>
      <Stack alignItems="center">
        <WrapItem>
          <Avatar
            size={{ base: 'xl', sm: '2xl' }}
            name="Placeholder"
            src="https://bit.ly/dan-abramov"
            my={{ base: 4, sm: 6 }}
          />
        </WrapItem>
        <Heading
          size={{ base: 'sm', sm: 'md', md: 'lg', lg: 'xl' }}
          textAlign="center"
        >
          JUDr. Zdeněk Kratochvíl
        </Heading>
      </Stack>
      <Stack
        alignItems="center"
        direction={{ base: 'column', md: 'column', lg: 'row' }}
        pt={{ base: 4, md: 8 }}
      >
        <ContactInfo contactInfo={mock_data} />
        <Container maxWidth="container.sm">
          <AccordionHelper items={dummy_data} />
        </Container>
      </Stack>
    </Box>
  )
}

import { Container } from '@chakra-ui/react'

import { ContactInfoItem } from './ContactInfoItem'

interface ContactInfoProps {
  contactInfo: {
    phone?: string
    email?: string
    completeAddress?: string
  }
}

export function ContactInfo({ contactInfo }: ContactInfoProps) {
  return (
    <Container
      textAlign="center"
      borderColor="bg.emphasized"
      borderRadius="xl"
      borderWidth="1px"
      bg="bg.panel"
      fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
      maxWidth={{ base: 'full', sm: 'fit-content' }}
      px={{ base: 4, sm: 8, md: 10 }}
      py={4}
    >
      <ContactInfoItem
        phone={contactInfo.phone}
        email={contactInfo.email}
        completeAddress={contactInfo.completeAddress}
      />
    </Container>
  )
}

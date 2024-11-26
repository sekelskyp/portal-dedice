import { Container, useBreakpointValue } from '@chakra-ui/react'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'

import { ContactInfoItem, ContactInfoItemProps } from './ContactInfoItem'

interface ContactInfoProps {
  contactInfo: {
    phone?: string
    email?: string
    completeAddress?: string
  }
}

export function ContactInfo({ contactInfo }: ContactInfoProps) {
  const iconBreakpoints = useBreakpointValue({
    base: '18px',
    sm: '20px',
    md: '24px',
  })

  const formatPhoneNumber = (phone: string) => {
    return phone.replace(/(\d{3})(?=\d)/g, '$1 ')
  }

  const contactIcons: ContactInfoItemProps[] = [
    {
      icon: <FiPhone size={iconBreakpoints} />,
      text: contactInfo.phone ? formatPhoneNumber(contactInfo.phone) : '',
    },
    {
      icon: <FiMail size={iconBreakpoints} />,
      text: contactInfo.email!,
    },
    {
      icon: <FiMapPin size={iconBreakpoints} />,
      text: contactInfo.completeAddress!,
    },
  ]

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
      {contactIcons.map((item, index) => (
        <ContactInfoItem key={index} icon={item.icon} text={item.text} />
      ))}
    </Container>
  )
}

import { Container, useBreakpointValue } from '@chakra-ui/react'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'

import { ContactInfoItem, ContactInfoItemProps } from './ContactInfoItem'

interface ContactInfoProps {
  contactInfo: {
    phone: string
    email: string
    address: string
  }
}

export function ContactInfo({ contactInfo }: ContactInfoProps) {
  const iconBreakpoints = useBreakpointValue({
    base: '18px',
    sm: '20px',
    md: '24px',
  })
  const contactIcons: ContactInfoItemProps[] = [
    {
      icon: <FiPhone size={iconBreakpoints} />,
      text: contactInfo.phone,
    },
    {
      icon: <FiMail size={iconBreakpoints} />,
      text: contactInfo.email,
    },
    {
      icon: <FiMapPin size={iconBreakpoints} />,
      text: contactInfo.address,
    },
  ]

  return (
    <Container
      textAlign="center"
      borderColor="gray.100"
      borderRadius="xl"
      borderWidth="2px"
      bg="gray.50"
      fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
      maxWidth="fit-content"
      px={{ base: 4, sm: 6, md: 10 }}
      py={4}
    >
      {contactIcons.map((item, index) => (
        <ContactInfoItem key={index} icon={item.icon} text={item.text} />
      ))}
    </Container>
  )
}

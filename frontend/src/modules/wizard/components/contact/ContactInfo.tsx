import { Container } from '@chakra-ui/react'
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
  const contactIcons: ContactInfoItemProps[] = [
    {
      icon: <FiPhone size={24} />,
      text: contactInfo.phone,
    },
    {
      icon: <FiMail size={24} />,
      text: contactInfo.email,
    },
    {
      icon: <FiMapPin size={24} />,
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
      fontSize="lg"
      maxWidth="fit-content"
      px={10}
      py={4}
    >
      {contactIcons.map((item, index) => (
        <ContactInfoItem key={index} icon={item.icon} text={item.text} />
      ))}
    </Container>
  )
}

import { Container, Stack, Text } from '@chakra-ui/react'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { Link } from 'react-router-dom'

interface ContactInfoProps {
  contactInfo: {
    phone: string
    email: string
    address: string
  }
}

interface ContactInfoItemProps {
  icon: JSX.Element
  text: string
}

function ContactInfoItem({ icon, text }: ContactInfoItemProps) {
  const isEmail = text.includes('@')

  return (
    <Stack direction="row" align="center" spacing={4} py={2}>
      {icon}
      {isEmail ? (
        <Link to={`mailto:${text}`}>
          <Text _hover={{ textDecoration: 'underline' }}>{text}</Text>
        </Link>
      ) : (
        <Text>{text}</Text>
      )}
    </Stack>
  )
}

export function ContactInfo({ contactInfo }: ContactInfoProps) {
  const contactIcons = [
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
      py={8}
    >
      {contactIcons.map((item, index) => (
        <ContactInfoItem key={index} icon={item.icon} text={item.text} />
      ))}
    </Container>
  )
}

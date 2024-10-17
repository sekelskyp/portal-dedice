import { Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export interface ContactInfoItemProps {
  icon: JSX.Element
  text: string
}

export function ContactInfoItem({ icon, text }: ContactInfoItemProps) {
  const isEmail: boolean = text.includes('@')

  return (
    <Stack
      direction="row"
      align="center"
      spacing={{ base: 2, sm: 4 }}
      py={2}
      textAlign="left"
    >
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

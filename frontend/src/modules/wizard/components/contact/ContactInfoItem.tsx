import { Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { z } from 'zod'

export interface ContactInfoItemProps {
  icon: JSX.Element
  text: string
}

export function ContactInfoItem({ icon, text }: ContactInfoItemProps) {
  const emailSchema = z.string().email()

  const isEmail: boolean = emailSchema.safeParse(text).success

  return (
    <Stack
      direction="row"
      align="center"
      gap={{ base: 2, sm: 4 }}
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

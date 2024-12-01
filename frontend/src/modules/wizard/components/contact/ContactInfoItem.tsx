import { Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { z } from 'zod'

export interface ContactInfoItemProps {
  icon: JSX.Element
  text: string
  displayText?: string
}

export function ContactInfoItem({
  icon,
  text,
  displayText,
}: ContactInfoItemProps) {
  const emailSchema = z.string().email()
  const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/)

  const isEmail: boolean = emailSchema.safeParse(text).success
  const isPhone: boolean = phoneSchema.safeParse(text).success

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
      ) : isPhone ? (
        <Link to={`tel:${text}`}>
          <Text _hover={{ textDecoration: 'underline' }}>
            {displayText || text}
          </Text>
        </Link>
      ) : (
        <Link
          to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(text)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Text _hover={{ textDecoration: 'underline' }}>{text}</Text>
        </Link>
      )}
    </Stack>
  )
}

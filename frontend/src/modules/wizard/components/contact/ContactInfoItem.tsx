import { Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { isEmail, isPhone } from '../../utils/contactUtils'

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
  return (
    <Stack
      direction="row"
      align="center"
      gap={{ base: 2, sm: 4 }}
      py={2}
      textAlign="left"
    >
      {icon}
      {isEmail(text) ? (
        <Link to={`mailto:${text}`}>
          <Text _hover={{ textDecoration: 'underline' }}>{text}</Text>
        </Link>
      ) : isPhone(text) ? (
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

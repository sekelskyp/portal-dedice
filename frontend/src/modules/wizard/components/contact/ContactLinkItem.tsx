import { Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import {
  formatPhoneNumberForDisplay,
  isEmail,
  isPhone,
} from '../../utils/contactUtils'

export function ContactLinkItem({
  contactItem,
}: {
  contactItem: { text: string; displayText?: string }
}) {
  let linkProps = { to: '', target: '', rel: '' }

  switch (true) {
    case isEmail(contactItem.text):
      linkProps.to = `mailto:${contactItem.text}`
      break
    case isPhone(contactItem.text):
      linkProps.to = `tel:${contactItem.text}`
      break
    default:
      linkProps.to = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactItem.text)}`
      linkProps.target = '_blank'
      linkProps.rel = 'noopener noreferrer'
      break
  }

  return (
    <Link {...linkProps}>
      <Text _hover={{ textDecoration: 'underline' }}>
        {isPhone(contactItem.text)
          ? formatPhoneNumberForDisplay(contactItem.text)
          : contactItem.text}
      </Text>
    </Link>
  )
}

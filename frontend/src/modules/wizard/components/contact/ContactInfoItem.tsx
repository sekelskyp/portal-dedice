import { Stack, useBreakpointValue } from '@chakra-ui/react'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'

import { ContactLinkItem } from './ContactLinkItem'

export function ContactInfoItem({
  phone,
  email,
  completeAddress,
}: {
  phone?: string
  email?: string
  completeAddress?: string
}) {
  const iconBreakpoints = useBreakpointValue({
    base: '18px',
    sm: '20px',
    md: '24px',
  })

  const contactItemsWithIcons = [
    {
      id: 1,
      icon: <FiPhone size={iconBreakpoints} />,
      text: phone ? phone : '',
    },
    {
      id: 2,
      icon: <FiMail size={iconBreakpoints} />,
      text: email ? email : '',
    },
    {
      id: 3,
      icon: <FiMapPin size={iconBreakpoints} />,
      text: completeAddress ? completeAddress : '',
    },
  ]

  return (
    <>
      {contactItemsWithIcons.map((contactItem) => (
        <Stack
          key={contactItem.id}
          direction="row"
          align="center"
          gap={{ base: 2, sm: 4 }}
          py={2}
          textAlign="left"
        >
          {contactItem.icon}
          <ContactLinkItem contactItem={contactItem} />
        </Stack>
      ))}
    </>
  )
}

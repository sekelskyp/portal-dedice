import { HStack, Stack, Text } from '@chakra-ui/react'
import { TbExclamationMark } from 'react-icons/tb'

import { Avatar, Tooltip } from '../design-system'

interface UserDetails {
  id: string
  name: string
  surname: string
  email: string
  displayName: string
  confirmed: boolean
  type: string
}

// TODO: Zmergovat do vícestavového UserBadge

export function UserBadge({ details }: { details: UserDetails }) {
  const role = details.type === 'User' ? 'Uživatel' : 'Notář'

  return (
    <HStack
      key={details.id}
      gap={4}
      p={2}
      justifyContent={{ base: 'center', lg: 'left' }}
    >
      {details.confirmed ? (
        <Avatar name={details.displayName} size={{ base: 'md', sm: 'xl' }} />
      ) : (
        <Tooltip
          content={`${role} ${details.name} ${details.surname} byl ze systému deaktivován. S uživatelem nebude již možná komunikace. V případě dotazů kontaktujte zákaznickou podporu.`}
          showArrow
          portalled
        >
          <Avatar
            fallback={<TbExclamationMark size={24} />}
            size={{ base: 'md', sm: 'xl' }}
            cursor="pointer"
          />
        </Tooltip>
      )}
      <Stack gap="0">
        <Text
          fontSize={{ base: 'md', lg: 'lg' }}
          fontWeight="bold"
          textDecoration={details.confirmed ? 'none' : 'line-through'}
        >
          {!!details.displayName.trim()
            ? details.displayName
            : `${details.name} ${details.surname}`}
        </Text>
        <Text
          fontSize={{ base: 'sm', lg: 'md' }}
          mt={-0.5}
          color="fg.subtle"
          textDecoration={details.confirmed ? 'none' : 'line-through'}
        >
          {details.email}
        </Text>
      </Stack>
    </HStack>
  )
}

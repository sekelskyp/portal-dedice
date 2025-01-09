import { HStack, Stack, Text } from '@chakra-ui/react'
import { FaUserLargeSlash } from 'react-icons/fa6'

import { Avatar } from '../design-system'

interface UserDetails {
  id: string
  name: string
  surname: string
  email: string
  displayName: string
  confirmed: boolean
}

export function UserBadge({ details }: { details: UserDetails }) {
  return (
    <HStack
      key={details.id}
      gap={4}
      p={2}
      justifyContent={{ base: 'center', lg: 'left' }}
      opacity={details.confirmed ? 1 : 0.7}
    >
      {details.confirmed ? (
        <Avatar name={details.displayName} size={{ base: 'md', sm: 'xl' }} />
      ) : (
        <Avatar
          fallback={<FaUserLargeSlash size={22} />}
          size={{ base: 'md', sm: 'xl' }}
        />
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

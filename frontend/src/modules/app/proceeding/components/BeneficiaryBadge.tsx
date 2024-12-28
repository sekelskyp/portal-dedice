import { HStack, Stack, Text } from '@chakra-ui/react'

import { Avatar } from '@frontend/shared/design-system'

interface User {
  id: string
  name: string
  surname: string
  email: string
  displayName: string
}

export function BeneficiaryBadge({
  beneficiaryContact,
}: {
  beneficiaryContact: User
}) {
  return (
    <HStack
      key={beneficiaryContact.id}
      gap={4}
      p={2}
      justifyContent={{ base: 'center', lg: 'left' }}
    >
      <Avatar name={beneficiaryContact.name} size={{ base: 'md', sm: 'xl' }} />
      <Stack gap="0">
        <Text fontSize={{ base: 'md', lg: 'lg' }} fontWeight="bold">
          {!!beneficiaryContact.displayName.trim()
            ? beneficiaryContact.displayName
            : `${beneficiaryContact.name} ${beneficiaryContact.surname}`}
        </Text>
        <Text fontSize={{ base: 'sm', lg: 'md' }} mt={-0.5} color="fg.subtle">
          {beneficiaryContact.email}
        </Text>
      </Stack>
    </HStack>
  )
}

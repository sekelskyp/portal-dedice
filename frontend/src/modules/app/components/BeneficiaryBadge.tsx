import { HStack, Stack, Text } from '@chakra-ui/react'

import { Contact } from '@frontend/gql/graphql'
import { Avatar } from '@frontend/shared/design-system'

//TODO: fix new contact structure

export function BeneficiaryBadge({
  beneficiaryContact,
}: {
  beneficiaryContact: Contact
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

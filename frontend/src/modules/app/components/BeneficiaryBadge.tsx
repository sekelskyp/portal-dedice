import { HStack, Stack, Text } from '@chakra-ui/react'

import { Contact } from '@frontend/gql/graphql'
import { Avatar } from '@frontend/shared/design-system'

const colorPalette = ['red', 'blue', 'green', 'yellow', 'purple', 'orange']

const pickPalette = (name: string) => {
  const index = name.charCodeAt(0) % colorPalette.length
  return colorPalette[index]
}

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
      justifyContent={{ base: 'center', md: 'left' }}
    >
      <Avatar
        name={beneficiaryContact.name}
        size={{ base: 'md', sm: 'xl' }}
        colorPalette={pickPalette(beneficiaryContact.email ?? '')}
      />
      <Stack gap="0">
        <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="bold">
          {beneficiaryContact.name} {beneficiaryContact.surname}
        </Text>
        <Text fontSize={{ base: 'sm', md: 'md' }} color="gray">
          {beneficiaryContact.email}
        </Text>
      </Stack>
    </HStack>
  )
}

import { HStack, Stack, Text } from '@chakra-ui/react'

import { Avatar } from '@frontend/shared/design-system'

const colorPalette = ['red', 'blue', 'green', 'yellow', 'purple', 'orange']

const pickPalette = (name: string) => {
  const index = name.charCodeAt(0) % colorPalette.length
  return colorPalette[index]
}

export function BeneficiaryBadge({
  beneficiaryContact,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  beneficiaryContact: any
}) {
  return (
    <HStack key={beneficiaryContact.id} gap={4} p={2}>
      <Avatar
        name={beneficiaryContact.name}
        size="lg"
        colorPalette={pickPalette(beneficiaryContact.email)}
      />
      <Stack gap="0">
        <Text fontWeight="medium">
          {beneficiaryContact.name} {beneficiaryContact.surname}
        </Text>
        <Text color="gray" textStyle="sm">
          {beneficiaryContact.email}
        </Text>
      </Stack>
    </HStack>
  )
}

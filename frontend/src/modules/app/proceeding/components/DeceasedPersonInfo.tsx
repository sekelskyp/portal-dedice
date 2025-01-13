import { HStack, Icon, Text } from '@chakra-ui/react'
import { AsteriskIcon, MapPinIcon } from 'lucide-react'

import { Stack } from '@frontend/shared/design-system'

import { formatDate } from '../../utils/dateUtils'

import { useProceedingContext } from './ProceedingLayout'

export const DeceasedPersonInfo = () => {
  const { proceeding } = useProceedingContext()

  if (!proceeding) return null

  return (
    <Stack p={2} gap={0}>
      <Text fontSize="md" fontWeight="bold">
        {proceeding.deceasedDisplayName}
      </Text>
      <HStack>
        <Icon size="xs" color="fg.muted">
          <AsteriskIcon />
        </Icon>
        <Text fontSize="sm" color="fg.muted">
          {`${formatDate(proceeding.deceasedDateOfBirth, 'MMMM yyyy')} — ${formatDate(proceeding.deceasedDateOfDeath, 'MMMM yyyy')}`}
        </Text>
      </HStack>
      <HStack>
        <Icon size="xs" color="fg.muted">
          <MapPinIcon />
        </Icon>
        <Text fontSize="sm" color="fg.muted">
          {proceeding.deceasedAddress?.street}{' '}
          {proceeding.deceasedAddress?.streetNumber},{' '}
          {proceeding.deceasedAddress?.municipality}{' '}
          {proceeding.deceasedAddress?.postalCode}
        </Text>
      </HStack>
    </Stack>
  )
}

import { useContext } from 'react'
import {
  Container,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'

import resources from '@frontend/resources'
import { Avatar } from '@frontend/shared/design-system'

import { useTooltip } from '../../../../shared/hooks/useTooltip'
import { useGetNotary } from '../../hooks/useFindNotary'
import { TestatorDataContext } from '../../pages/WizardStepPage'
import { AccordionHelper } from '../accordion/AccordionHelper'
import { ContactInfo } from '../contact/ContactInfo'

import { NotaryAssignmentError } from './NotaryAssignmentError'
import { NotaryAssignmentHelper } from './NotaryAssignmentHelper'

interface NotaryAssignmentProps {
  nextStep: () => void
  previousStep: () => void
}

export function NotaryAssignment({
  nextStep,
  previousStep,
}: NotaryAssignmentProps) {
  const { isOpen, openTooltip, closeTooltip, toggleTooltip } = useTooltip()
  const testatorDataContext = useContext(TestatorDataContext)
  const { testatorData } = testatorDataContext

  const { notary, loading, error } = useGetNotary(
    testatorData.birthDate,
    testatorData.addressInput?.postalCode
  )

  if (loading)
    return (
      <Stack direction="row" justifyItems="center">
        <Spinner />
        <Text>Načítání...</Text>
      </Stack>
    )
  if (error)
    return (
      <NotaryAssignmentError
        errorMessage={error.message}
        action={previousStep}
      />
    )

  return (
    <Stack gap={8} alignItems="center">
      <Heading
        size={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' }}
        textAlign="center"
      >
        {resources.wizard.notaryAssignment.title}
      </Heading>
      <Flex align="flex-start">
        <Avatar
          size={{ base: 'xl', sm: '2xl' }}
          src={
            notary.gender === 'Female' ? '/woman-avatar.png' : '/man-avatar.png'
          }
          aria-label="Female and Male icons created by Prosymbols Premium - Flaticon"
        />
      </Flex>
      <Heading
        size={{ base: 'sm', sm: 'md', md: 'lg', lg: 'xl' }}
        textAlign="center"
      >
        {notary.displayName}
      </Heading>
      <Container px={0} asChild>
        <Stack
          alignItems="start"
          direction={{ base: 'column', md: 'column', lg: 'row' }}
          gap={8}
        >
          <ContactInfo
            contactInfo={{
              email: notary.email,
              phone: notary.phone,
              completeAddress: `${notary.address.street} ${notary.address.streetNumber}, ${notary.address.municipality} ${notary.address.postalCode}`,
            }}
          />
          <AccordionHelper
            items={resources.wizard.notaryAssignment.accordions}
          />
        </Stack>
      </Container>
      <NotaryAssignmentHelper
        nextStep={nextStep}
        previousStep={previousStep}
        isOpen={isOpen}
        closeTooltip={closeTooltip}
        openTooltip={openTooltip}
        toggleTooltip={toggleTooltip}
      />
    </Stack>
  )
}

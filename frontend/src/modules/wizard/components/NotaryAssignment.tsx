import { useContext } from 'react'
import { Button, Container, Flex, Heading, Stack, Text } from '@chakra-ui/react'

import { Avatar, Tooltip } from '@frontend/shared/design-system'
import { SimpleCentered } from '@frontend/shared/design-system/atoms/CTA/SimpleCentered'

import { useGetNotary } from '../hooks/useFindNotary'
import { useTooltip } from '../hooks/useTooltip'
import { TestatorDataContext } from '../pages/WizardStepPage'

import { AccordionHelper } from './accordion/AccordionHelper'
import { ContactInfo } from './contact/ContactInfo'
import { NotaryAssignmentError } from './NotaryAssignmentError'

const dummy_data = [
  {
    id: 1,
    title: 'Mohu si vybrat jiného notáře?',
    description: 'Bohužel, změna notáře není možná.',
  },
  {
    id: 2,
    title: 'Kde je toto upraveno?',
    description:
      'Notář je určen rozvrhem práce, což je právní předpis.\nDostupný zde: https://www.nkcr.cz/seznam-notaru/rozvrhy-rizeni-o-pozustalosti',
  },
]

const tooltipText =
  'Tato aplikace vám srozumitelně vysvětlí, co vás v pozůstalostním řízení čeká a díky návodu zjistíte, jaké jsou možnosti rozdělení majetku v pozůstalosti.'

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
    '130 00'
  )

  if (loading) return <Text>Loading...</Text>
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
        Na základě vyplněných údajů vám byl přidělen následující notář:
      </Heading>
      <Flex align="flex-start">
        <Avatar
          size={{ base: 'xl', sm: '2xl' }}
          name=""
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
        {notary.name} {notary.surname}
      </Heading>
      <Container px={0} asChild>
        <Stack
          alignItems="start"
          direction={{ base: 'column', md: 'column', lg: 'row' }}
          gap={8}
        >
          <ContactInfo contactInfo={notary} />
          <AccordionHelper items={dummy_data} />
        </Stack>
      </Container>
      <SimpleCentered bg="blue.bg">
        <Heading size={{ base: 'sm', sm: 'md', md: 'lg', lg: '2xl' }}>
          Nevíte jak dál?
        </Heading>
        <Text fontSize={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' }}>
          Pojďte se v naší{' '}
          <Tooltip content={tooltipText} showArrow open={isOpen}>
            <Text
              as="u"
              onMouseLeave={closeTooltip}
              onMouseEnter={openTooltip}
              onClick={toggleTooltip}
            >
              aplikaci
            </Text>
          </Tooltip>{' '}
          dozvědět více o tom, co vás čeká v pozůstalostním řízení.
        </Text>
        <Flex justify="space-between" gap={4}>
          <Button bg="gray.500" onClick={previousStep} size="lg">
            Zpět
          </Button>
          <Button onClick={nextStep} size="lg">
            OK
          </Button>
        </Flex>
      </SimpleCentered>
    </Stack>
  )
}

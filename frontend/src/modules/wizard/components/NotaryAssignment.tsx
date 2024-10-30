import { useContext } from 'react'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'

import { Avatar, Tooltip } from '@frontend/shared/design-system'

import { useGetNotary } from '../hooks/useGetNotary'
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

  const { notary, loading, error } = useGetNotary(testatorData.birthDate)

  if (loading) return <Text>Loading...</Text>
  if (error)
    return (
      <NotaryAssignmentError
        errorMessage={error.message}
        action={previousStep}
      />
    )

  return (
    <Box>
      <Heading
        size={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' }}
        textAlign="center"
      >
        Na základě vyplněných údajů vám byl přidělen následující notář:
      </Heading>
      <Stack alignItems="center">
        <Flex align="flex-start">
          <Avatar
            size={{ base: 'xl', sm: '2xl' }}
            name=""
            src={
              notary.gender === 'Female'
                ? '/woman-avatar.png'
                : '/man-avatar.png'
            }
            aria-label="Female and Male icons created by Prosymbols Premium - Flaticon"
            my={{ base: 4, sm: 6 }}
          />
        </Flex>
        <Heading
          size={{ base: 'sm', sm: 'md', md: 'lg', lg: 'xl' }}
          textAlign="center"
          mb={{ base: 2, md: 6 }}
        >
          {notary.name} {notary.surname}
        </Heading>
      </Stack>
      <Stack
        alignItems="center"
        direction={{ base: 'column', md: 'column', lg: 'row' }}
        pt={{ base: 4, md: 0 }}
      >
        <ContactInfo contactInfo={notary} />
        <Container maxWidth="container.sm">
          <AccordionHelper items={dummy_data} />
        </Container>
      </Stack>
      <Container
        alignItems="center"
        bg="gray.50"
        p={8}
        borderRadius="xl"
        textAlign="left"
        mt={8}
      >
        <Stack direction="column">
          <Heading size={{ base: 'sm', sm: 'md', md: 'lg', lg: 'xl' }}>
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
          <Stack direction="row" pt={2} justify="center">
            <Button bg="gray.500" onClick={previousStep}>
              Zpět
            </Button>
            <Button onClick={nextStep}>OK</Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

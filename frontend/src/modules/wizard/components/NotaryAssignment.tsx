import { useContext } from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  Tooltip,
  WrapItem,
} from '@chakra-ui/react'

import { useTooltip } from '../hooks/useTooltip'
import { NotaryDataContext } from '../pages/WizardStepPage'

import { AccordionHelper } from './accordion/AccordionHelper'
import { ContactInfo } from './contact/ContactInfo'

const GET_NOTARY_QUERY = gql(/* GraphQL */ `
  query GetNotaryByAddressAndBirthDate(
    $address: AddressInput!
    $expirationDate: DateTimeISO!
  ) {
    getNotaryByAddressAndBirthDate(
      address: $address
      expirationDate: $expirationDate
    ) {
      contact {
        id
        name
        surname
        postalCode
        phone
        email
      }
    }
  }
`)

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

  const notaryDataContext = useContext(NotaryDataContext)

  const { notaryData } = notaryDataContext

  const birthDataISO = notaryData.birthDate
    ? new Date(notaryData.birthDate).toISOString()
    : ''

  const { data, loading, error } = useQuery(GET_NOTARY_QUERY, {
    variables: {
      address: {
        postalCode: notaryData.postalCode,
      },
      expirationDate: birthDataISO,
    },
  })

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  const notary = data.getNotaryByAddressAndBirthDate.contact

  return (
    <Box>
      <Heading
        size={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' }}
        textAlign="center"
      >
        Na základě vyplněných údajů vám byl přidělen následující notář:
      </Heading>
      <Stack alignItems="center">
        <WrapItem>
          <Avatar
            size={{ base: 'xl', sm: '2xl' }}
            name={notary.name}
            src="https://bit.ly/dan-abramov"
            my={{ base: 4, sm: 6 }}
          />
        </WrapItem>
        <Heading
          size={{ base: 'sm', sm: 'md', md: 'lg', lg: 'xl' }}
          textAlign="center"
          mb={6}
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
            <Tooltip
              label={tooltipText}
              bg="gray.50"
              color="black"
              p={4}
              borderRadius="xl"
              hasArrow
              placement="top"
              isOpen={isOpen}
              fontSize={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' }}
            >
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

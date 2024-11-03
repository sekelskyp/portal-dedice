import React from 'react'
import { useQuery } from '@apollo/client'
import {
  Box,
  Button,
  Card,
  Heading,
  HStack,
  Spinner,
  Stack,
  Table,
  Text,
} from '@chakra-ui/react'
import { FaCalculator, FaCloudUploadAlt } from 'react-icons/fa'
import { HiChat } from 'react-icons/hi'
import { LuFile } from 'react-icons/lu'
import { Link, useParams } from 'react-router-dom'

import { gql } from '@frontend/gql'
import { useAuth } from '@frontend/modules/auth'
import { Alert } from '@frontend/shared/design-system'
import { UnauthorizedPage } from '@frontend/shared/navigation/pages/UnauthorizedPage'

import { BeneficiaryBadge } from '../components/BeneficiaryBadge'
import { StatusBadge } from '../components/StatusBadge'

const GET_PROCEDURE_QUERY = gql(/* GraphQL */ `
  query GetProcedureById($id: Int!) {
    getProcedureById(id: $id) {
      id
      name
      mainContact {
        id
        name
        surname
        displayName
        gender
        phone
        email
        completeAddress
        postalCode
      }
      beneficiaries {
        id
        userId
        user {
          id
          email
        }
        contactId
        contact {
          id
          email
          name
          surname
        }
        deceasedRelation
      }
      procedureAssets {
        id
        name
        value
      }
      state
    }
  }
`)

const InheritanceProcedureDetail: React.FC = () => {
  const user = useAuth()
  const { id } = useParams()

  const idInt = parseInt(id ?? '0', 10)
  const { loading, error, data } = useQuery(GET_PROCEDURE_QUERY, {
    variables: { id: idInt },
  })

  if (loading) {
    return (
      <Box textAlign="center" py={10} px={6}>
        <Spinner size="xl" />
      </Box>
    )
  }

  if (error) {
    return (
      <Box textAlign="center" py={10} px={6}>
        <Text>{error.message}</Text>
      </Box>
    )
  }

  const procedure = data?.getProcedureById

  const totalAssetsValue =
    procedure?.procedureAssets?.reduce((sum, asset) => sum + asset.value, 0) ??
    0

  if (!user.token) {
    return <UnauthorizedPage />
  } else {
    return (
      <Stack display="flex" alignItems="center" justifyContent="center">
        {procedure ? (
          <Card.Root w="full">
            <Card.Header as={HStack} gap={4}>
              <Heading size="2xl">Detail řízení</Heading>
            </Card.Header>
            <Card.Body gap={4}>
              <HStack>
                <LuFile size={24} />
                <Heading>{procedure?.name}</Heading>
                <StatusBadge ml="auto" state={procedure.state} />
              </HStack>
              <Stack>
                <Heading size={'xl'} textAlign={{ base: 'center', lg: 'left' }}>
                  Hlavní kontaktní osoba
                </Heading>
                {procedure.mainContact ? (
                  <BeneficiaryBadge
                    beneficiaryContact={procedure.mainContact}
                  />
                ) : (
                  <Alert status="warning">Dědic bez kontaktních údajů.</Alert>
                )}
              </Stack>
              <Stack>
                <Heading
                  size={{ base: 'lg', lg: 'xl' }}
                  py={4}
                  textAlign={{ base: 'center', lg: 'left' }}
                >
                  Výpis dědiců
                </Heading>
                {procedure.beneficiaries?.map((beneficiary) =>
                  beneficiary.contact ? (
                    <BeneficiaryBadge
                      key={beneficiary.id}
                      beneficiaryContact={beneficiary.contact}
                    />
                  ) : (
                    <Alert status="warning" key={beneficiary.id}>
                      Dědic bez kontaktních údajů.
                    </Alert>
                  )
                )}
              </Stack>
              <Heading
                size={{ base: 'lg', lg: 'xl' }}
                py={4}
                textAlign={{ base: 'center', lg: 'left' }}
              >
                Celková hodnota majetku
              </Heading>
              {procedure.procedureAssets?.length === 0 ? (
                <Stack alignItems={{ base: 'center', lg: 'start' }}>
                  <Text fontSize="md">Tuto hodnotu zatím neznáme.</Text>
                  <Button as={Link} disabled width="fit-content" rounded="full">
                    Modelace
                    <FaCalculator />
                  </Button>
                </Stack>
              ) : (
                <Text fontSize="lg" textAlign={{ base: 'center', lg: 'left' }}>
                  {totalAssetsValue},- Kč
                </Text>
              )}
              <Heading
                size={{ base: 'lg', lg: 'xl' }}
                py={4}
                textAlign={{ base: 'center', lg: 'left' }}
              >
                Děděné položky
              </Heading>
              {procedure.procedureAssets?.length === 0 ? (
                <Stack alignItems={{ base: 'center', lg: 'start' }}>
                  <Text fontSize="md">Tyto hodnoty zatím neznáme.</Text>
                  <Button as={Link} disabled width="fit-content" rounded="full">
                    Modelace
                    <FaCalculator />
                  </Button>
                </Stack>
              ) : (
                <Table.Root size={{ base: 'sm', md: 'lg' }}>
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeader textAlign="center" fontWeight="bold">
                        Název
                      </Table.ColumnHeader>
                      <Table.ColumnHeader textAlign="center" fontWeight="bold">
                        Hodnota
                      </Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {procedure.procedureAssets?.map((item) => (
                      <Table.Row key={item.id}>
                        <Table.Cell textAlign="center">{item.name}</Table.Cell>
                        <Table.Cell textAlign="center">
                          {item.value},- Kč
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              )}
              <Heading
                size={{ base: 'lg', lg: 'xl' }}
                py={4}
                textAlign={{ base: 'center', lg: 'left' }}
              >
                Návrh vypořádaní ze strany zůstavitele
              </Heading>
              <Text fontSize="md" textAlign={{ base: 'center', lg: 'left' }}>
                Tuto hodnotu zatím neznáme.
              </Text>
            </Card.Body>
            <Card.Footer justifyContent="center">
              <Stack direction={{ base: 'column', lg: 'row' }}>
                {!user.user?.isNotary ? (
                  <>
                    <Button as={Link} disabled rounded="full">
                      Modelace vyrovnaní
                      <FaCalculator />
                    </Button>
                    <Button as={Link} disabled rounded="full">
                      Přiložit přílohu
                      <FaCloudUploadAlt />
                    </Button>
                    <Button as={Link} disabled rounded="full">
                      Chat s notářem
                      <HiChat />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button as={Link} disabled>
                      Hromadná zpráva všem zůstavitelům
                    </Button>
                  </>
                )}
              </Stack>
            </Card.Footer>
          </Card.Root>
        ) : (
          <Text>No procedure found</Text>
        )}
      </Stack>
    )
  }
}

export default InheritanceProcedureDetail

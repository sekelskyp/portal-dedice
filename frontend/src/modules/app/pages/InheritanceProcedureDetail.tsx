import React from 'react'
import { useQuery } from '@apollo/client'
import {
  Box,
  Button,
  Card,
  Heading,
  Spinner,
  Stack,
  Table,
  Text,
} from '@chakra-ui/react'
import { FaCalculator } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'

import { gql } from '@frontend/gql'
import { useAuth } from '@frontend/modules/auth'
import { Page } from '@frontend/shared/layout'
import { UnauthorizedPage } from '@frontend/shared/navigation/pages/UnauthorizedPage'

import { BeneficiaryBadge } from '../components/BeneficiaryBadge'
import { StatusBadge } from '../components/StatusBadge'

const GET_PROCEDURE_QUERY = gql(/* GraphQL */ `
  query GetProcedureById($id: Int!) {
    getProcedureById(id: $id) {
      id
      name
      mainBeneficiary {
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
          gender
        }
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
      <Page>
        <Stack display="flex" alignItems="center" justifyContent="center">
          <Heading size="3xl">Detail řízení</Heading>
          {procedure ? (
            <Card.Root size="lg" borderRadius="2xl" width="50%">
              <Card.Body gap="2">
                <Card.Title mt="2" textAlign="center">
                  {procedure?.name}
                </Card.Title>
                <Card.Description>
                  <Heading size="lg" py={2}>
                    Hlavní kontaktní osoba
                  </Heading>
                  <BeneficiaryBadge
                    beneficiaryContact={procedure.mainBeneficiary?.contact}
                  />
                  <Heading size="lg" py={2}>
                    Status
                  </Heading>
                  <StatusBadge state={procedure.state} />
                  <Heading size="lg" py={2}>
                    Výpis dědiců
                  </Heading>
                  {procedure.beneficiaries?.map((beneficiary) => (
                    <BeneficiaryBadge
                      beneficiaryContact={beneficiary.contact}
                    />
                  ))}
                  <Text fontSize="lg" mt={3} py={2}>
                    <strong>Celková hodnota majetku</strong>
                  </Text>
                  {procedure.procedureAssets?.length === 0 ? (
                    <Stack>
                      <Text fontSize="md">Tuto hodnotu zatím neznáme.</Text>
                      <Button
                        as={Link}
                        disabled
                        width="fit-content"
                        rounded="full"
                      >
                        Modelace
                        <FaCalculator />
                      </Button>
                    </Stack>
                  ) : (
                    <Text fontSize="lg">{totalAssetsValue},- Kč</Text>
                  )}
                  <Heading as="h2" size="lg" mt={5} mb={3}>
                    Děděné položky
                  </Heading>
                  {procedure.procedureAssets?.length === 0 ? (
                    <Stack>
                      <Text fontSize="md">Tyto hodnoty zatím neznáme.</Text>
                      <Button
                        as={Link}
                        disabled
                        width="fit-content"
                        rounded="full"
                      >
                        Modelace
                        <FaCalculator />
                      </Button>
                    </Stack>
                  ) : (
                    <Table.Root size="sm">
                      <Table.Header>
                        <Table.Row>
                          <Table.ColumnHeader
                            textAlign="center"
                            fontWeight="bold"
                          >
                            Název
                          </Table.ColumnHeader>
                          <Table.ColumnHeader
                            textAlign="center"
                            fontWeight="bold"
                          >
                            Hodnota
                          </Table.ColumnHeader>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {procedure.procedureAssets?.map((item) => (
                          <Table.Row key={item.id}>
                            <Table.Cell textAlign="center">
                              {item.name}
                            </Table.Cell>
                            <Table.Cell textAlign="center">
                              {item.value},- Kč
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Root>
                  )}
                  <Heading as="h2" size="lg" mt={5} mb={3}>
                    Návrh vypořádaní ze strany zůstavitele
                  </Heading>
                  <Text fontSize="md">Tuto hodnotu zatím neznáme.</Text>
                </Card.Description>
              </Card.Body>
              <Card.Footer justifyContent="center">
                <Stack>
                  {!user.user?.isNotary ? (
                    <>
                      <Button as={Link} disabled>
                        Modelace dědického vyrovnání
                      </Button>
                      <Button as={Link} disabled>
                        Přiložit přílohu
                      </Button>
                      <Button as={Link} disabled>
                        Chat s notářem
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
      </Page>
    )
  }
}

export default InheritanceProcedureDetail

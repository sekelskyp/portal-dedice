import React from 'react'
import { useQuery } from '@apollo/client'
import {
  Box,
  Button,
  Heading,
  List,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'

import { gql } from '@frontend/gql'
import { useAuth } from '@frontend/modules/auth'
import { Page } from '@frontend/shared/layout'
import { UnauthorizedPage } from '@frontend/shared/navigation/pages/UnauthorizedPage'

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
        <Box display="flex" alignItems="center">
          <Heading as="h1">Procedure Detail</Heading>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minH={{ base: 'xs', sm: 'container.sm' }}
        >
          {procedure ? (
            <Box>
              <Text fontSize="lg">
                <strong>ID:</strong> {procedure.id}
              </Text>
              <Text fontSize="lg">
                <strong>Řízení:</strong> {procedure.name}
              </Text>
              <Text fontSize="lg">
                <strong>Hlavní kontaktní osoba:</strong>{' '}
                {procedure.mainBeneficiary?.contact?.name}{' '}
                {procedure.mainBeneficiary?.contact?.surname}
              </Text>
              <Text fontSize="lg">
                <strong>Status:</strong> {procedure.state}
              </Text>
              <Heading as="h2" size="lg" mt={5} mb={3}>
                Výpis dědiců
              </Heading>
              <List.Root listStyleType={'none'}>
                {procedure.beneficiaries?.map((beneficiary) => (
                  <List.Item key={beneficiary.id}>
                    <Text>
                      <strong>User Email:</strong> {beneficiary.user?.email}
                    </Text>
                    <Text>
                      <strong>Contact Name:</strong> {beneficiary.contact?.name}{' '}
                      {beneficiary.contact?.surname}
                    </Text>
                    <Text>
                      <strong>Contact Email:</strong>{' '}
                      {beneficiary.contact?.email}
                    </Text>
                  </List.Item>
                ))}
              </List.Root>{' '}
              <Text fontSize="lg" mt={3}>
                <strong>Celková hodnota majetku:</strong> {totalAssetsValue} ,-
                Kč
                {/* TODO: CTA na modelaci */}
              </Text>
              <Heading as="h2" size="lg" mt={5} mb={3}>
                Děděné položky
              </Heading>
              <List.Root listStyleType={'none'}>
                {procedure.procedureAssets?.map((asset) => (
                  <List.Item key={asset.id}>
                    <Text>
                      <strong>Název:</strong> {asset.name}
                    </Text>
                    <Text>
                      <strong>Hodnota:</strong> {asset.value}
                    </Text>
                  </List.Item>
                ))}
              </List.Root>
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
            </Box>
          ) : (
            <Text>No procedure found</Text>
          )}
        </Box>
      </Page>
    )
  }
}

export default InheritanceProcedureDetail

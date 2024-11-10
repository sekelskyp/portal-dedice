import { useQuery } from '@apollo/client'
import { Button, Heading, List, Spinner, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import { gql } from '@frontend/gql'
import { useAuth } from '@frontend/modules/auth'
import { Page } from '@frontend/shared/layout'
import { NotFoundPage } from '@frontend/shared/navigation/pages/NotFoundPage'
import { UnauthorizedPage } from '@frontend/shared/navigation/pages/UnauthorizedPage'

import { DocumentUpload } from '../components/DocumentUpload'
import { documentTypes } from '../utils/documentTypes'

const GET_PROCEDURE_DOCUMENT_QUERY = gql(/* GraphQL */ `
  query GetProcedureName($id: Int!) {
    getProcedureById(id: $id) {
      name
    }
  }
`)

export function NewDocumentPage() {
  const user = useAuth()
  const { id } = useParams()

  const idInt = parseInt(id ?? '0', 10)

  const { data, loading, error } = useQuery(GET_PROCEDURE_DOCUMENT_QUERY, {
    variables: { id: idInt },
  })

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <NotFoundPage />
  }

  const procedure = data?.getProcedureById

  if (!user.token) {
    return <UnauthorizedPage />
  } else {
    return (
      <Page>
        <Heading size="xl">
          Přiložit přílohu k tomuto řízení: {procedure?.name}
        </Heading>
        <Text>
          Pro zrychlení dědického řízení pomůže, když notáři doložíte tyto
          dokumenty:
        </Text>
        <List.Root>
          {documentTypes.map((documentType) => (
            <List.Item key={documentType.id}>
              <Text as={'span'} fontWeight="bold">
                {documentType.type}
              </Text>
              <Text as={'span'} color="gray">
                {''} ({documentType.text})
              </Text>
            </List.Item>
          ))}
        </List.Root>
        <DocumentUpload />
        <Button m={4}>Nahrát přílohu</Button>
      </Page>
    )
  }
}

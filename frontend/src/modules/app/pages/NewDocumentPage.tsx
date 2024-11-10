import { useQuery } from '@apollo/client'
import { Heading, Spinner, Stack, Text } from '@chakra-ui/react'
import { FaFileUpload } from 'react-icons/fa'
import { LuFile } from 'react-icons/lu'
import { useParams } from 'react-router-dom'

import { gql } from '@frontend/gql'
import { useAuth } from '@frontend/modules/auth'
import { AccordionHelper } from '@frontend/modules/wizard/components/accordion/AccordionHelper'
import { RouterNavLink } from '@frontend/shared/navigation/atoms'
import { NotFoundPage } from '@frontend/shared/navigation/pages/NotFoundPage'
import { UnauthorizedPage } from '@frontend/shared/navigation/pages/UnauthorizedPage'
import { route } from '@shared/route'

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
      <Stack gap={8}>
        <Heading size="3xl" textAlign="center">
          Nahrání nové přílohy
        </Heading>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <LuFile size={24} />
          <Heading>{procedure?.name}</Heading>
        </Stack>
        <Stack direction="row" gap={16}>
          <Stack direction="column">
            <Text>
              Pro zrychlení dědického řízení pomůže, když notáři doložíte tyto
              dokumenty:
            </Text>
            <AccordionHelper items={documentTypes} />
          </Stack>
          <DocumentUpload />
        </Stack>
        <Stack
          justifyContent="center"
          alignItems="center"
          justifyItems="center"
        >
          <RouterNavLink
            to={route.inheritanceProcedure(id)}
            width="30%"
            size="xl"
          >
            Nahrát přílohu <FaFileUpload />
          </RouterNavLink>
        </Stack>
      </Stack>
    )
  }
}

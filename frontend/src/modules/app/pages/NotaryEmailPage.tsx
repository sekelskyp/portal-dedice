import { Heading, Spinner, Stack, Text } from '@chakra-ui/react'
import { LuFile } from 'react-icons/lu'
import { useParams } from 'react-router-dom'

import { NotFoundPage } from '@frontend/shared/navigation/pages/NotFoundPage'

import { useProcedure } from '../hooks/useProcedure'

export function NotaryEmailPage() {
  const { id } = useParams()

  const { data, loading, error } = useProcedure({
    procedureId: parseInt(id ?? '0', 10),
  })

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <NotFoundPage />
  }

  const procedure = data?.getProcedureById

  return (
    <Stack>
      <Stack
        direction="row"
        alignItems="center"
        py={2}
        justifyContent={{ base: 'center', md: 'start' }}
      >
        <LuFile size={24} />
        <Heading>{procedure?.name}</Heading>
      </Stack>
      <Heading size="lg">Email notáře</Heading>
      <Text fontSize="md">Tato stránka je dostupná pouze notářům.</Text>
    </Stack>
  )
}

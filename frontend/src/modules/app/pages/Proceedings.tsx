import { Button, Heading, Stack, Text } from '@chakra-ui/react'
import { MdNoteAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { useAuth } from '@frontend/modules/auth'
import { Alert } from '@frontend/shared/design-system'
import { UnauthorizedPage } from '@frontend/shared/navigation/pages/UnauthorizedPage'
import { route } from '@shared/route'

import {
  ProceedingsItem,
  ProceedingsTable,
} from '../components/proceedings-table/ProceedingsTable'
import { useBeneficiaryProcedures } from '../hooks/useBeneficiaryProcedures'
import { useNotaryProcedures } from '../hooks/useNotaryProcedures'
import { proceedingsNavigation } from '../utils/proceedingsNavigation'

export function Proceedings() {
  const user = useAuth()
  const beneficiaryProcedures = useBeneficiaryProcedures()
  const notaryProcedures = useNotaryProcedures()

  let procedures: ProceedingsItem[] = []

  const { data, loading, error } = user.user?.isNotary
    ? notaryProcedures
    : beneficiaryProcedures

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>
  if (data) {
    if ('getProceduresByNotaryId' in data) {
      procedures = data.getProceduresByNotaryId.map((item) => ({
        ...item,
        id: String(item.id),
      }))
    } else if ('getProceduresByBeneficiaryId' in data) {
      procedures = data.getProceduresByBeneficiaryId.map((item) => ({
        ...item,
        id: String(item.id),
      }))
    }
  }

  if (user.token) {
    return (
      <Stack alignItems="start" gap={8}>
        <Stack justifyContent="center" alignItems="center" w="full">
          <Heading textAlign="center" size="3xl">
            Moje řízení
          </Heading>
          {!user.user?.isNotary && (
            <Link to={route.newProceeding()}>
              <Button
                rounded="full"
                bg="gray.500"
                _hover={{ bg: 'gray.700' }}
                my={4}
              >
                Vytvořit nové řízení
                <MdNoteAdd />
              </Button>
            </Link>
          )}
          {procedures.length !== 0 ? (
            <ProceedingsTable data={procedures} />
          ) : (
            <Alert
              justifyContent="center"
              status="warning"
              title="Seznam řízení je prázdný."
              size={{ base: 'md', md: 'lg' }}
              width="fit-content"
              borderRadius="xl"
              my={4}
            />
          )}
          {!user.user?.isNotary && (
            <Stack gap={4} textAlign="center">
              <Heading size="xl">Další možnosti</Heading>
              {proceedingsNavigation.map((item, index) => (
                <Link key={index} to={item.link}>
                  <Button width="fit-content" rounded="full">
                    {item.text} {item.icon}
                  </Button>
                </Link>
              ))}
            </Stack>
          )}
        </Stack>
      </Stack>
    )
  } else {
    return <UnauthorizedPage />
  }
}

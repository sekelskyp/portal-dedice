import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import { FiNavigation } from 'react-icons/fi'
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

//TODO: add routing when pages are ready

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
        id: Number(item.id),
      }))
    } else if ('getProceduresByBeneficiaryId' in data) {
      procedures = data.getProceduresByBeneficiaryId.map((item) => ({
        ...item,
        id: Number(item.id),
      }))
    }
  }

  if (user.token) {
    return (
      <Stack justifyContent="center" alignContent="center" alignItems="center">
        <Heading textAlign="center" pt={8} size="3xl" mb={2}>
          Mé řízení
        </Heading>
        {!user.user?.isNotary && (
          <Link to={route.home()}>
            {' '}
            <Button>
              Vytvořit nové řízení
              <MdNoteAdd />
            </Button>
          </Link>
        )}
        <Heading size="2xl" mt={10}>
          Seznam řízení
        </Heading>
        {procedures.length !== 0 ? (
          <ProceedingsTable data={procedures} />
        ) : (
          <Box my={6}>
            <Alert
              justifyContent="center"
              status="warning"
              title="Seznam řízení je prázdný."
              size={{ base: 'md', md: 'lg' }}
            />
          </Box>
        )}
        {!user.user?.isNotary && (
          <Stack>
            <Heading size="xl" textAlign="center">
              Další možnosti
            </Heading>
            <Stack direction="column" textAlign="center" mb={10}>
              {proceedingsNavigation.map((item, index) => (
                <Link key={index} to={item.link}>
                  <Button width="100%">
                    {item.text} <FiNavigation />
                  </Button>
                </Link>
              ))}
            </Stack>
          </Stack>
        )}
      </Stack>
    )
  } else {
    return <UnauthorizedPage />
  }
}

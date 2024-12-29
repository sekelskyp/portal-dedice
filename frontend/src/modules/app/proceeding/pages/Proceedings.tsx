import {
  Button,
  Card,
  Heading,
  HStack,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { MdNoteAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { useAuth } from '@frontend/modules/auth'
import { Alert } from '@frontend/shared/design-system'
import { RouterNavLink } from '@frontend/shared/navigation/atoms'
import { UnauthorizedPage } from '@frontend/shared/navigation/pages/UnauthorizedPage'
import { route } from '@shared/route'

import {
  ProceedingsItem,
  ProceedingsTable,
} from '../components/ProceedingsTable'
import { useBeneficiaryProceedings } from '../hooks/useBeneficiaryProceedings'
import { useNotaryProcedures } from '../hooks/useNotaryProcedures'
import { proceedingsNavigation } from '../utils/proceedingsNavigation'

export function Proceedings() {
  const user = useAuth()
  const isNotary = user.user?.type === 'Notary'
  const beneficiaryProceedings = useBeneficiaryProceedings()
  const notaryProceedings = useNotaryProcedures()

  const data = {
    proceedings: isNotary
      ? notaryProceedings.data?.getNotaryProceedingsForUser
      : beneficiaryProceedings.data?.getBeneficiaryProceedingsForUser,
    loading: isNotary
      ? notaryProceedings.loading
      : beneficiaryProceedings.loading,
    error: isNotary ? notaryProceedings.error : beneficiaryProceedings.error,
  }

  let procedures: ProceedingsItem[] = []

  if (data.loading)
    return (
      <Stack direction="row" justifyItems="center">
        <Spinner />
        <Text>Načítání...</Text>
      </Stack>
    )
  if (data.error) return <Text>Error: {data.error.message}</Text>
  if (data.proceedings) {
    procedures = data.proceedings.map((item) => ({
      ...item,
      id: String(item.id),
    }))
  }

  if (user.token) {
    return (
      <Stack gap={8}>
        <Card.Root>
          <Card.Header
            as={HStack}
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <Heading size={{ base: 'xl', sm: '2xl' }}>Moje řízení</Heading>
            {!isNotary && (
              <RouterNavLink
                to={route.newProceeding()}
                size={{ base: 'sm', sm: 'lg' }}
              >
                <MdNoteAdd />
                Vytvořit nové řízení
              </RouterNavLink>
            )}
          </Card.Header>
          <Card.Body>
            {procedures.length !== 0 ? (
              <ProceedingsTable data={procedures} />
            ) : (
              <Alert
                status="warning"
                title="Seznam řízení je prázdný."
                size="lg"
                borderRadius="xl"
              />
            )}
          </Card.Body>
        </Card.Root>
        {!isNotary && (
          <Stack gap={4} alignItems={{ base: 'center', sm: 'start' }}>
            <Heading size={{ base: 'xl', sm: '2xl' }}>Další možnosti</Heading>
            {proceedingsNavigation.map((item) => (
              <Link key={item.link} to={item.link}>
                <Button width="fit-content" rounded="full">
                  {item.text} {item.icon}
                </Button>
              </Link>
            ))}
          </Stack>
        )}
      </Stack>
    )
  } else {
    return <UnauthorizedPage />
  }
}

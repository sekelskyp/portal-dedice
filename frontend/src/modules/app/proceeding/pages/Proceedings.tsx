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
import { useGetAllProceedings } from '../hooks/useGetAllProceedings'
import { useNotaryProcedures } from '../hooks/useNotaryProcedures'
import { loadProceedings } from '../utils/loadProceedings'
import { proceedingsNavigation } from '../utils/proceedingsNavigation'

export function Proceedings() {
  const { user, token } = useAuth()
  const isNotary = user?.type === 'Notary'
  const isAdmin = user?.type === 'Admin'
  const isUser = user?.type === 'User'
  const beneficiaryProceedings = useBeneficiaryProceedings()
  const notaryProceedings = useNotaryProcedures()
  const allProceedings = useGetAllProceedings()

  const data = loadProceedings(
    isAdmin,
    isNotary,
    allProceedings,
    notaryProceedings,
    beneficiaryProceedings
  )

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

  if (token) {
    return (
      <Stack gap={8}>
        <Card.Root>
          <Card.Header
            as={HStack}
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <Heading size={{ base: 'xl', sm: '2xl' }}>Moje řízení</Heading>
            {isUser && (
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
            {isUser && (
              <Stack
                gap={4}
                alignItems={{ base: 'center', sm: 'start' }}
                pt={8}
              >
                <Heading size={{ base: 'xl', sm: '2xl' }}>
                  Další možnosti
                </Heading>
                {proceedingsNavigation.map((item) => (
                  <Link key={item.link} to={item.link}>
                    <Button width="fit-content" rounded="full">
                      {item.text} {item.icon}
                    </Button>
                  </Link>
                ))}
              </Stack>
            )}
          </Card.Body>
        </Card.Root>
      </Stack>
    )
  } else {
    return <UnauthorizedPage />
  }
}

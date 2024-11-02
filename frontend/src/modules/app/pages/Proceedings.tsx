import { Button, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import { LuPlus } from 'react-icons/lu'
import { Link } from 'react-router-dom'

import { useAuth } from '@frontend/modules/auth'
import resources from '@frontend/resources'
import { Alert } from '@frontend/shared/design-system'
import { RouterNavLink } from '@frontend/shared/navigation/atoms'
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
      <VStack alignItems="start" gap={8}>
        <HStack justifyContent="space-between" alignItems="start" w="full">
          <Heading textAlign="center" size="3xl">
            Moje řízení
          </Heading>
          {!user.user?.isNotary && (
            <RouterNavLink
              to={route.newProceeding()}
              size={{ base: 'sm', sm: 'xl' }}
            >
              <LuPlus /> {resources.portal.pages.proceedings.newProceeding}
            </RouterNavLink>
          )}
        </HStack>
        {procedures.length !== 0 ? (
          <ProceedingsTable data={procedures} />
        ) : (
          <Alert
            justifyContent="center"
            status="warning"
            title="Seznam řízení je prázdný."
            size="lg"
          />
        )}
        {!user.user?.isNotary && (
          <Stack gap={4}>
            <Heading size="xl">Další možnosti</Heading>
            {proceedingsNavigation.map((item, index) => (
              <Link key={index} to={item.link}>
                <Button width="100%" rounded="full">
                  {item.text} {item.icon}
                </Button>
              </Link>
            ))}
          </Stack>
        )}
      </VStack>
    )
  } else {
    return <UnauthorizedPage />
  }
}

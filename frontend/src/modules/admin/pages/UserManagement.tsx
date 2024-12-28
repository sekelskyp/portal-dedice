import { Card, Heading, HStack, Spinner, Stack, Text } from '@chakra-ui/react'
import { IoPersonAddSharp } from 'react-icons/io5'

import { useAuth } from '@frontend/modules/auth'
import { Alert } from '@frontend/shared/design-system'
import { RouterNavLink } from '@frontend/shared/navigation/atoms'
import { UnauthorizedPage } from '@frontend/shared/navigation/pages/UnauthorizedPage'
import { route } from '@shared/route'

import { UserItem, UserTable } from '../components/UserTable'
import { useGetAllUsers } from '../hooks/useGetAllUsers'

//TODO: add routing to invite page when it's ready

export function UserManagement() {
  const { user, token } = useAuth()
  const isAdmin = user?.type === 'Admin'
  const { data, loading, error } = useGetAllUsers()

  let users: UserItem[] = []

  if (loading) {
    return (
      <Stack direction="row" justifyItems="center">
        <Spinner />
        <Text>Načítání...</Text>
      </Stack>
    )
  }

  if (error) return <Text>Error: {error.message}</Text>

  if (data?.getAllUsers) {
    users = data.getAllUsers
      .filter((item) => item.id !== user?.id)
      .map((item) => ({
        id: item.id,
        displayName: item.displayName || `${item.name} ${item.surname}`,
        type: item.type,
        address: item.address
          ? `${item.address.street || ''}, ${item.address.streetNumber || ''}, ${
              item.address.postalCode || ''
            }, ${item.address.municipality || ''}`
          : '',
      }))
  }

  if (token && isAdmin) {
    return (
      <Stack gap={8} p={8} mx={8}>
        <Card.Root>
          <Card.Header
            as={HStack}
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <Heading size={{ base: 'xl', sm: '2xl' }}>Správa uživatelů</Heading>
            <RouterNavLink to={route.home()} size={{ base: 'sm', sm: 'lg' }}>
              <IoPersonAddSharp />
              Pozvat do aplikace
            </RouterNavLink>
          </Card.Header>
          <Card.Body>
            {users.length !== 0 ? (
              <UserTable data={users} />
            ) : (
              <Alert
                status="warning"
                title="Seznam uživatelů je prázdný."
                size="lg"
                borderRadius="xl"
              />
            )}
          </Card.Body>
        </Card.Root>
      </Stack>
    )
  } else {
    return <UnauthorizedPage />
  }
}

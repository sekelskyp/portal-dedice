import { Card, Heading, HStack, Spinner, Stack, Text } from '@chakra-ui/react'
import { IoPersonAddSharp } from 'react-icons/io5'

import { useAuth } from '@frontend/modules/auth'
import { Alert } from '@frontend/shared/design-system'
import { RouterNavLink } from '@frontend/shared/navigation/atoms'
import { UnauthorizedPage } from '@frontend/shared/navigation/pages/UnauthorizedPage'
import { route } from '@shared/route'

import { UserItem, UserTable } from '../components/UserTable'
import { useGetAllUsers } from '../hooks/useGetAllUsers'
import { loadUsers } from '../utils/user-utils'

//TODO: add routing to invite page when it's ready

export function UserManagement() {
  const { user, token } = useAuth()
  const { data, loading, error } = useGetAllUsers()
  const isAdmin = user?.type === 'Admin'

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

  users = loadUsers({ data, user }) || []

  if (token && isAdmin) {
    return (
      <Stack gap={8} p={{ base: 4, md: 8 }} mx={{ base: 0, sm: 4, md: 8 }}>
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

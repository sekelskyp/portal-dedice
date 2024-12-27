import { Card, Heading, HStack, Stack } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'

import { useAuth } from '@frontend/modules/auth'
import { Alert } from '@frontend/shared/design-system'
import { UnauthorizedPage } from '@frontend/shared/navigation/pages/UnauthorizedPage'

import { UserItem, UserTable } from '../components/UserTable'

const generateFakeUsers = (count: number): UserItem[] => {
  const userTypes = ['Notary', 'Beneficiary', 'Admin'] as const
  return Array.from({ length: count }, (_, index) => ({
    id: (index + 1).toString(),
    displayName: faker.person.fullName(),
    address: faker.location.streetAddress(true),
    type: faker.helpers.arrayElement(userTypes),
  }))
}

export function UserManagement() {
  const { user, token } = useAuth()
  const isAdmin = user?.type === 'Admin'

  const fakeUsers = generateFakeUsers(100) // Generate 10 fake users

  if (token && isAdmin) {
    return (
      <Stack gap={8} p={8}>
        <Card.Root>
          <Card.Header
            as={HStack}
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <Heading size={{ base: 'xl', sm: '2xl' }}>Správa uživatelů</Heading>
          </Card.Header>
          <Card.Body>
            {fakeUsers.length !== 0 ? (
              <UserTable data={fakeUsers} />
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

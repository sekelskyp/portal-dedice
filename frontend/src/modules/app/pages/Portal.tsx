import { Button, Heading, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { useAuth } from '@frontend/modules/auth'
import { route } from '@frontend/route'
import { Page } from '@frontend/shared/layout'
import { UnauthorizedPage } from '@frontend/shared/navigation/pages/UnauthorizedPage'

export function Portal() {
  const user = useAuth()

  if (user.token) {
    return (
      <Page as={Stack} gap={0} justifyContent={'space-between'} h={'full'}>
        <Stack alignItems="center" justifyContent="center" h="full">
          <Heading>Portál Dědice</Heading>
          <Text>Vítejte, {user.user?.login}</Text>
          <Button as={Link} to={route.proceedings()}>
            Moje řízení
          </Button>
        </Stack>
      </Page>
    )
  } else {
    return <UnauthorizedPage />
  }
}

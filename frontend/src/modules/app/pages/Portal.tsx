import { Button, Heading, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { useAuth } from '@frontend/modules/auth'
import { Page } from '@frontend/shared/layout'
import { UnauthorizedPage } from '@frontend/shared/navigation/pages/UnauthorizedPage'
import { route } from '@shared/route'

export function Portal() {
  const user = useAuth()

  if (user.token) {
    return (
      <Page as={Stack} gap={0} justifyContent={'space-between'} h={'full'}>
        <Stack alignItems="center" justifyContent="center" h="full">
          <Heading>Portál Dědice</Heading>
          <Text>Vítejte, {user.user?.email}</Text>
          <Link to={route.proceedings()}>
            <Button>Moje řízení</Button>
          </Link>
        </Stack>
      </Page>
    )
  } else {
    return <UnauthorizedPage />
  }
}

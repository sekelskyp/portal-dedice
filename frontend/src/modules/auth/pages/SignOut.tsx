import { useEffect } from 'react'
import { Center, Heading, Stack } from '@chakra-ui/react'

import resources from '@frontend/resources'
import { route } from '@frontend/route'
import { Page } from '@frontend/shared/layout'
import { RouterNavLink } from '@frontend/shared/navigation/atoms'

import { useAuth } from '../auth-core'

export const SignOutPage = () => {
  const { user, signOut } = useAuth()

  useEffect(() => {
    if (user) signOut()
  }, [user, signOut])

  return (
    <Page as={Center}>
      <Stack>
        <Heading as="h2" size="3xl">
          {resources.auth.pages.signOut.signedOut}
        </Heading>
        <RouterNavLink to={route.signIn()}>
          {resources.shared.CTA.signIn}
        </RouterNavLink>
      </Stack>
    </Page>
  )
}

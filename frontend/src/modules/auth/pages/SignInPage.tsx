import { useCallback } from 'react'
import {
  Alert,
  AlertIcon,
  Container,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'

import resources from '@frontend/resources'
import { route } from '@frontend/route'
import { Box } from '@frontend/shared/design-system'
import { Page } from '@frontend/shared/layout'
import { RouterLink } from '@frontend/shared/navigation/atoms'

import { SignInForm } from '../components/SignInForm'
import { useSignIn } from '../hooks/useSignIn'

export function SignInPage() {
  const [signInRequest, signInRequestState] = useSignIn()

  const handleSignInFormSubmit = useCallback(
    (variables: { email: string; password: string }) => {
      signInRequest({
        variables: {
          login: variables.email,
          password: variables.password,
        },
      })
    },
    [signInRequest]
  )

  return (
    <Page>
      <Container as={Stack} gap={4}>
        <Heading as="h2" size={'2xl'}>
          {resources.auth.pages.signIn.title}
        </Heading>
        {signInRequestState.error ? (
          <Alert status="error">
            <AlertIcon />
            {signInRequestState.error.message}
          </Alert>
        ) : null}
        <SignInForm
          onSubmit={handleSignInFormSubmit}
          error={signInRequestState.error}
        />
        <Box>
          <Text as="b">{resources.auth.pages.signIn.noAccount}</Text>{' '}
          <RouterLink to={route.signUp()}>
            {resources.shared.CTA.signUp}
          </RouterLink>
        </Box>
        <RouterLink to={route.resetPassword()}>
          Zapomněli jste heslo?
        </RouterLink>
      </Container>
    </Page>
  )
}

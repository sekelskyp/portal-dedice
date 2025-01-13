import { useCallback } from 'react'
import { Container, Flex, Heading, Stack, Text } from '@chakra-ui/react'

import resources from '@frontend/resources'
import { Alert, Box } from '@frontend/shared/design-system'
import { Page } from '@frontend/shared/layout'
import { RouterLink } from '@frontend/shared/navigation/atoms'
import { route } from '@shared/route'

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
    <Page
      px={{ base: 4, sm: 16, lg: 20, xl: 24 }}
      py={{ base: 8, sm: 16, lg: 24 }}
    >
      <Flex
        alignItems="center"
        direction={{
          base: 'column',
          lg: 'row',
        }}
        gap={{
          base: 0,
          lg: 24,
          xl: 40,
        }}
      >
        <Box
          flex={{ base: 1, lg: 7 }}
          textAlign={{
            base: 'center',
            lg: 'left',
          }}
        >
          <Heading
            mb={4}
            fontSize={{
              base: '2xl',
              sm: '3xl',
              md: '4xl',
            }}
            fontWeight="bold"
            lineHeight={{
              base: 'shorter',
              md: 'none',
            }}
            letterSpacing={{
              base: 'normal',
              md: 'tight',
            }}
          >
            Přihlášení do Portálu Dědice
          </Heading>
          <Text
            pr={{ base: 0, lg: 36 }}
            mb={{
              base: 8,
              md: 4,
            }}
            fontSize={{
              base: 'md',
              sm: 'lg',
              md: 'xl',
            }}
            fontWeight="thin"
            color="fg.subtle"
            letterSpacing="wider"
          >
            Začněte řešit pozůstalostní řízení online z pohodlí vašeho domova.
            Spojte se s vaším notářem ještě dnes.
          </Text>
        </Box>
        <Box flex={{ base: 1, lg: 4 }} w={'full'}>
          <Box rounded="xl">
            <Heading size="3xl" as="h4" textAlign="center" mb={6}>
              Přihlášení
            </Heading>
            <Container maxW="lg" as={Stack} gap={4} px={0}>
              {signInRequestState.error ? (
                <Alert
                  status="error"
                  title={signInRequestState.error.message}
                />
              ) : null}
              <SignInForm
                onSubmit={handleSignInFormSubmit}
                error={signInRequestState.error}
                loading={signInRequestState.loading}
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
          </Box>
        </Box>
      </Flex>
    </Page>
  )
}

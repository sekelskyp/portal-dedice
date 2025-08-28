import { useCallback } from 'react'
import { Box, Container, Flex, Image, Stack } from '@chakra-ui/react'

import { Alert } from '@shared/design-system'
import { Page } from '@shared/layout'

import { PasswordResetForm } from '../components/PasswordResetForm'
import { useRequestPasswordReset } from '../hooks/useResetPassword'

import resetPassword from '/reset-password.png'

export function PasswordResetPage() {
  const [resetPasswordRequest, resetPasswordRequestState] =
    useRequestPasswordReset()

  const handlePasswordResetFormSubmit = useCallback(
    (variables: { email: string }) => {
      resetPasswordRequest({
        variables: {
          email: variables.email,
        },
      })
    },
    [resetPasswordRequest]
  )

  return (
    <Page
      px={{ base: 4, sm: 16, lg: 20, xl: 24 }}
      py={{ base: 8, sm: 16, lg: 24 }}
    >
      {resetPasswordRequestState.error ? (
        <Alert status="error" title={resetPasswordRequestState.error.message} />
      ) : null}
      <Flex
        alignItems="center"
        direction={{
          base: 'column',
          lg: 'row',
        }}
      >
        <Box
          flex={{ base: 1, lg: 7 }}
          textAlign={{
            base: 'center',
            lg: 'left',
          }}
        >
          <Image src={resetPassword} />
        </Box>
        <Box flex={{ base: 1, lg: 4 }} w={'full'}>
          <Box rounded="xl">
            <Container maxW="lg" as={Stack} gap={4}>
              <PasswordResetForm
                onSubmit={handlePasswordResetFormSubmit}
                loading={resetPasswordRequestState.loading}
              />
            </Container>
          </Box>
        </Box>
      </Flex>
    </Page>
  )
}

import { useCallback } from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'

import { Page } from '@frontend/shared/layout'
import { NotFoundPage } from '@frontend/shared/navigation/pages/NotFoundPage'

import { PasswordChangeForm } from '../components/PasswordChangeForm'
import { useResetPassword } from '../hooks/useResetPassword'

export function PasswordChangePage() {
  const [resetPasswordRequest, resetPasswordRequestState] = useResetPassword()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const queryToken = queryParams.get('token')

  const handleChangePasswordFormSubmit = useCallback(
    (variables: { newPassword: string }) => {
      if (!queryToken) return

      resetPasswordRequest({
        variables: {
          token: queryToken,
          newPassword: variables.newPassword,
        },
      })
    },
    [resetPasswordRequest, queryToken]
  )

  if (!queryToken) {
    return <NotFoundPage />
  }

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
            Zapomněli jste své heslo?
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
            color="gray.500"
            letterSpacing="wider"
          >
            Vítejte v obnově hesla. Zadejte své nové heslo a pokračujte dál v
            aplikaci. Po změne hesla je nutné se znovu přihlásit.
          </Text>
        </Box>
        <Box flex={{ base: 1, lg: 4 }} w={'full'}>
          <Box rounded="xl">
            <Heading size="3xl" as="h4" textAlign="center" mb={6}>
              Obnova hesla
            </Heading>
            <PasswordChangeForm
              onSubmit={handleChangePasswordFormSubmit}
              loading={resetPasswordRequestState.loading}
            ></PasswordChangeForm>
          </Box>
        </Box>
      </Flex>
    </Page>
  )
}

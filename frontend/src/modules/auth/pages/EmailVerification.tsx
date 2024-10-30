import { useEffect } from 'react'
import { Box, Button, Icon, Spinner, Text } from '@chakra-ui/react'
import { FaCheckCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { Page } from '@frontend/shared/layout'
import { NotFoundPage } from '@frontend/shared/navigation/pages/NotFoundPage'
import { route } from '@shared/route'

import { useEmailToken } from '../hooks/useEmailToken'

export function EmailVerification() {
  const { emailTokenRequest, emailTokenRequestState, queryToken } =
    useEmailToken()

  useEffect(() => {
    if (queryToken) {
      emailTokenRequest()
    }
  }, [emailTokenRequest, queryToken])

  if (!queryToken) {
    return <NotFoundPage />
  }

  if (emailTokenRequestState.loading) {
    return (
      <Page>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Spinner size="xl" />
        </Box>
      </Page>
    )
  }

  if (emailTokenRequestState.error) {
    return <NotFoundPage />
  }

  if (emailTokenRequestState.data) {
    return (
      <Page>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minH={{ base: 'xs', sm: 'container.sm' }}
        >
          <Box textAlign="center">
            <Icon
              boxSize={{ base: '48px', sm: '64px', md: '72px' }}
              color="green"
            >
              <FaCheckCircle />
            </Icon>
            <Text
              fontSize={{ sm: 'xl', md: '2xl', lg: '3xl' }}
              fontWeight="bold"
              mb={4}
              mx={{ base: 8, sm: 0 }}
            >
              Děkujeme za ověření vaší e-mailové adresy.
            </Text>
            <Text
              fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
              color="gray.600"
              mx={{ base: 8, sm: 0 }}
            >
              Váš účet je nyní aktivní.
            </Text>
            <Text
              fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
              color="gray.600"
              mx={{ base: 8, sm: 0 }}
              mt={4}
            >
              Pro kompletní přístup k portálu se prosím přihlašte.
            </Text>
            <Button asChild mt={4}>
              <Link to={route.signIn()}>Přihlásit se</Link>
            </Button>
          </Box>
        </Box>
      </Page>
    )
  }
}

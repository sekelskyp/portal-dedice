import { Box, Icon, Text } from '@chakra-ui/react'
import { FaCheckCircle } from 'react-icons/fa'

import { route } from '@frontend/route'
import { Page } from '@frontend/shared/layout'
import { RouterLink } from '@frontend/shared/navigation/atoms'
import { NotFoundPage } from '@frontend/shared/navigation/pages/NotFoundPage'

import { useVerificationToken } from '../hooks/useVerificationToken'

export function EmailVerification() {
  const { token } = useVerificationToken()

  if (!token) {
    return <NotFoundPage />
  }

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
            as={FaCheckCircle}
            boxSize={{ base: '48px', sm: '64px', md: '72px' }}
            color="green"
          />
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
            Nyní máte kompletní přístup k Portálu Dědice.
          </Text>
          <Text
            fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
            color="gray.600"
            mx={{ base: 8, sm: 0 }}
            mt={4}
          >
            {' '}
            Pokračujte zpět{' '}
            <RouterLink to={route.home()} fontWeight="bold">
              Domů
            </RouterLink>
            .
          </Text>
        </Box>
      </Box>
    </Page>
  )
}

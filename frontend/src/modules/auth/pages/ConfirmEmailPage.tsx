import { Box, Icon, Text } from '@chakra-ui/react'
import { FaCheckCircle } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'

import { Page } from '@frontend/shared/layout'
import { NotFoundPage } from '@frontend/shared/navigation/pages/NotFoundPage'

export function ConfirmEmailPage() {
  const location = useLocation()
  const email = location.state?.email

  if (!email) {
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
            Děkujeme za registraci do portálu.
          </Text>
          <Text
            fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
            color="gray.600"
            mx={{ base: 8, sm: 0 }}
          >
            Na vaši e-mailovou adresu{' '}
            <Text as="span" color="primary.700" textDecoration="underline">
              {email}
            </Text>{' '}
            jsme vám zaslali potvrzovací email.
          </Text>
        </Box>
      </Box>
    </Page>
  )
}

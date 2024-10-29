import { Button, Icon, Text } from '@chakra-ui/react'
import { FiAlertCircle } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { route } from '@frontend/route'
import { Box } from '@frontend/shared/design-system'

export function UnauthorizedPage() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH={{ base: 'xs', sm: 'container.sm' }}
    >
      <Box textAlign="center">
        <Icon
          as={FiAlertCircle}
          boxSize={{ base: '48px', sm: '64px', md: '72px' }}
          color="red.500"
        />
        <Text
          fontSize={{ sm: 'xl', md: '2xl', lg: '3xl' }}
          fontWeight="bold"
          mb={4}
          mx={{ base: 8, sm: 0 }}
        >
          Chyba 401.
          <Box as="span" display={{ base: 'inline', sm: 'none' }}>
            <br />
          </Box>
          <Box as="span" display={{ base: 'none', sm: 'inline' }}>
            {' '}
          </Box>
          Přístup zamítnut
        </Text>
        <Text
          fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
          color="gray.600"
          mx={{ base: 8, sm: 0 }}
        >
          Stránka, kterou se snažíte najít, vyžaduje autorizaci.
        </Text>
        <Box mt={6} display="flex" gap={2} justifyContent="center">
          <Button asChild>
            <Link to={route.signUp()}>Registrovat se</Link>
          </Button>
          <Button asChild>
            <Link to={route.signIn()}>Přihlásit se</Link>
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

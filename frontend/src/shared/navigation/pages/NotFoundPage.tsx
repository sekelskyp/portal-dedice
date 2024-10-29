import { Icon, Text } from '@chakra-ui/react'
import { FiAlertCircle } from 'react-icons/fi'

import { route } from '@frontend/route'
import { Box } from '@frontend/shared/design-system'

import { RouterLink } from '../atoms'

export function NotFoundPage() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH={{ base: 'xs', sm: 'container.sm' }}
    >
      <Box textAlign="center">
        <Icon
          //as={FiAlertCircle}
          boxSize={{ base: '48px', sm: '64px', md: '72px' }}
          color="red.500"
        >
          <FiAlertCircle />
        </Icon>
        <Text
          fontSize={{ sm: 'xl', md: '2xl', lg: '3xl' }}
          fontWeight="bold"
          mb={4}
          mx={{ base: 8, sm: 0 }}
        >
          Chyba 404.
          <Box as="span" display={{ base: 'inline', sm: 'none' }}>
            <br />
          </Box>
          <Box as="span" display={{ base: 'none', sm: 'inline' }}>
            {' '}
          </Box>
          Stránka nenalezena
        </Text>
        <Text
          fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
          color="gray.600"
          mx={{ base: 8, sm: 0 }}
        >
          Stránka, kterou se snažíte najít, neexistuje. Vraťte se{' '}
          <RouterLink to={route.home()} fontWeight="bold">
            Domů
          </RouterLink>
          .
        </Text>
      </Box>
    </Box>
  )
}

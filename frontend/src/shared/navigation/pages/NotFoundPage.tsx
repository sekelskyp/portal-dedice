import { Icon, Text } from '@chakra-ui/react'
import { CircleAlert } from 'lucide-react'

import { Box } from '@frontend/shared/design-system'
import { route } from '@shared/route'

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
          boxSize={{ base: '48px', sm: '64px', md: '72px' }}
          color="red.500"
        >
          <CircleAlert />
        </Icon>
        <Text
          fontSize={{ sm: 'xl', md: '2xl', lg: '3xl' }}
          fontWeight="bold"
          mb={4}
          mx={{ base: 8, sm: 0 }}
        >
          Stránka nebyla nalezena.
        </Text>
        <Text
          fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
          color="gray.600"
          mx={{ base: 8, sm: 0 }}
        >
          Stránka, kterou se snažíte najít, neexistuje. Vraťte se{' '}
          <RouterLink to={route.home()} fontWeight="bold" color="primary.500">
            Domů
          </RouterLink>
          .
        </Text>
      </Box>
    </Box>
  )
}

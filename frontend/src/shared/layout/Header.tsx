import { Box, Container, Flex, Heading, HStack, Image } from '@chakra-ui/react'
import { useTheme } from 'next-themes'
import { Link } from 'react-router-dom'

import { useAuth } from '@frontend/modules/auth'
import { route } from '@shared/route'

import { TopNavigation } from '../navigation/organisms/TopNavigation'

import { UserMenu } from './components/UserMenu'

export const Header = () => {
  return (
    <Box
      bg="bg.panel"
      boxShadow="0px 0px 12px 0px rgba(0, 0, 0, 0.06)"
      borderBottom="1px solid"
      borderColor="bg.muted"
    >
      <Container
        maxW="container.xl"
        py={4}
        px={{ base: 4, sm: 6, '2xl': 0 }}
        asChild
        gap={12}
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack>
          <AppLink />
          <Flex gap={2} flexDirection={{ base: 'row-reverse', sm: 'initial' }}>
            <TopNavigation />
            <UserMenu />
          </Flex>
        </HStack>
      </Container>
    </Box>
  )
}

const AppLink = () => {
  const theme = useTheme()
  const isDark = theme.resolvedTheme === 'dark'

  const { user } = useAuth()

  return (
    <HStack asChild gap={4} alignItems="center">
      <Link to={user ? route.portal() : '/'}>
        <Image
          h={8}
          src={isDark ? '/logo-dark.png' : '/logo.png'}
          opacity={isDark ? 0.8 : 1}
        />
        <Heading mt={1} size="lg" whiteSpace="nowrap">
          Portál Dědice
        </Heading>
      </Link>
    </HStack>
  )
}

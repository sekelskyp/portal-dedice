import { Box, Container, Heading, HStack, Image } from '@chakra-ui/react'
import { useTheme } from 'next-themes'
import { Link } from 'react-router-dom'

import { TopNavigation } from '../navigation/organisms/TopNavigation'

export const Header = () => {
  return (
    <Box bg="bg.muted">
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
          <TopNavigation />
        </HStack>
      </Container>
    </Box>
  )
}

const AppLink = () => {
  const theme = useTheme()
  const isDark = theme.resolvedTheme === 'dark'
  return (
    <HStack asChild gap={4}>
      <Link to="/">
        <Image
          h={10}
          src={isDark ? '/logo-dark.png' : '/logo.png'}
          opacity={isDark ? 0.8 : 1}
        />
        <Heading size="lg" whiteSpace="nowrap">
          Portál Dědice
        </Heading>
      </Link>
    </HStack>
  )
}

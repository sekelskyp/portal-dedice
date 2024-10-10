import { Box, Container, Heading, HStack, Image, Stack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { TopNavigation } from '../navigation/organisms/TopNavigation'

export const Header = () => {
  return (
    <Box bg="gray.100">
      <Container
        maxW="container.xl"
        p={4}
        as={Stack}
        direction="row"
        gap={4}
        alignItems="center"
        justifyContent="space-between"
      >
        <AppLink />
        <TopNavigation />
      </Container>
    </Box>
  )
}

const AppLink = () => {
  return (
    <HStack as={Link} to={'/'} gap={4}>
      <Image h={10} src="/logo-nkcr.png" />
      <Heading as="h4">Portál dědice</Heading>
    </HStack>
  )
}

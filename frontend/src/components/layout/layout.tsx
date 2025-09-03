import { Box, Flex } from '@chakra-ui/react'
import { Toaster } from '@components/ui/toaster'
import { Outlet } from 'react-router-dom'

import { Footer } from './footer'
import { Header } from './header'

export const Layout = () => {
  return (
    <Flex direction="column" minH="100vh">
      <Box as="header">
        <Header />
      </Box>

      <Box as="main" flex="1" minH="60vh">
        <Outlet />
      </Box>

      <Box as="footer">
        <Footer />
      </Box>
      <Toaster />
    </Flex>
  )
}

import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import { Toaster } from '../design-system'

import { Footer } from './Footer'
import { Header } from './Header'

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

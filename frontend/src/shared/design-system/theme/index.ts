import { extendTheme } from '@chakra-ui/react'

import { Alert } from './components/Alert'
import { Button } from './components/Button'
import { Heading } from './components/Heading'
import { colors } from './Colors'

export const theme = extendTheme({
  colors,
  fonts: {
    body: 'Inter, sans-serif',
    heading: 'Inter, sans-serif',
  },
  components: {
    Button,
    Heading,
    Alert,
  },
})

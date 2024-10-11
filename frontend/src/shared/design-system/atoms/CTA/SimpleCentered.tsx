import { ReactNode } from 'react'
import { Center, Container, Stack } from '@chakra-ui/react'

export const SimpleCentered = ({ children }: { children: ReactNode }) => (
  <Center
    as={Stack}
    w={'full'}
    px={4}
    py={20}
    textAlign={{
      base: 'left',
      md: 'center',
    }}
  >
    <Container as={Stack} gap={4} alignItems="center">
      {children}
    </Container>
  </Center>
)

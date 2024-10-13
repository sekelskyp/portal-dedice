import { ReactNode } from 'react'
import { Center, Container, ContainerProps, Stack } from '@chakra-ui/react'

export const SimpleCentered = ({
  children,
  ...rest
}: { children: ReactNode } & ContainerProps) => (
  <Center
    as={Stack}
    w={'full'}
    px={4}
    my={10}
    textAlign={{
      base: 'left',
      md: 'center',
    }}
  >
    <Container
      as={Stack}
      gap={4}
      alignItems="center"
      bg="primary.50"
      p={16}
      borderRadius={'lg'}
      {...rest}
    >
      {children}
    </Container>
  </Center>
)

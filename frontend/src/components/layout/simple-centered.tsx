import { ReactNode } from 'react'
import { Center, Container, ContainerProps, Stack } from '@chakra-ui/react'

export const SimpleCentered = ({
  children,
  ...rest
}: { children: ReactNode } & ContainerProps) => (
  <Center
    as={Stack}
    w={'full'}
    textAlign={{
      base: 'left',
      md: 'center',
    }}
  >
    <Container
      as={Stack}
      gap={4}
      alignItems="center"
      p={16}
      borderRadius={'lg'}
      {...rest}
    >
      {children}
    </Container>
  </Center>
)

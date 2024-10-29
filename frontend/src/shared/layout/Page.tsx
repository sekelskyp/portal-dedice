import { forwardRef } from 'react'
import { Container, ContainerProps } from '@chakra-ui/react'

export const Page = forwardRef((props: ContainerProps, ref) => {
  return (
    <Container maxW="container.xl" py={6} {...props}>
      {props.children}
    </Container>
  )
})

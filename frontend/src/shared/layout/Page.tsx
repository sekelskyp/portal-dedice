import { Container, forwardRef } from '@chakra-ui/react'

export const Page = forwardRef((props, ref) => {
  return (
    <Container maxW="container.xl" py={8} ref={ref} {...props}>
      {props.children}
    </Container>
  )
})

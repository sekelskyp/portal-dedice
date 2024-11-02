import { forwardRef } from 'react'
import { Container, ContainerProps, useBreakpoint } from '@chakra-ui/react'

export const Page = forwardRef((props: ContainerProps, ref) => {
  const breakpoint = useBreakpoint({ breakpoints: ['2xl'] })

  const maxWidthReached = breakpoint === '2xl'

  return (
    <Container
      maxW="container.xl"
      py={6}
      px={maxWidthReached ? 0 : 6}
      {...props}
    >
      {props.children}
    </Container>
  )
})

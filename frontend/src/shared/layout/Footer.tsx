import { Box, Container, Text } from '@chakra-ui/react'

export const Footer = () => {
  return (
    <Box>
      <Container maxW="container.xl">
        <Text fontSize="sm" my={2}>
          © 2023 Portál dědice. Všechna práva vyhrazena.
        </Text>
      </Container>
    </Box>
  )
}

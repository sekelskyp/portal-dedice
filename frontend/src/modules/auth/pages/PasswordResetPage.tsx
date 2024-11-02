import { Box, Container, Flex, Image, Stack } from '@chakra-ui/react'

import { PasswordResetForm } from '../components/PasswordResetForm'

export function PasswordResetPage() {
  const handlePasswordResetFormSubmit = (data: { email: string }) =>
    console.log(data)

  return (
    <Container px={8} py={{ base: 8, sm: 16, lg: 24 }}>
      <Flex
        alignItems="center"
        direction={{
          base: 'column',
          lg: 'row',
        }}
      >
        <Box
          flex={{ base: 1, lg: 7 }}
          textAlign={{
            base: 'center',
            lg: 'left',
          }}
        >
          <Image src="/reset-password.png" />
        </Box>
        <Box flex={{ base: 1, lg: 4 }} w={'full'}>
          <Box rounded="xl">
            <Container maxW="lg" as={Stack} gap={4}>
              <PasswordResetForm
                onSubmit={handlePasswordResetFormSubmit}
              ></PasswordResetForm>
            </Container>
          </Box>
        </Box>
      </Flex>
    </Container>
  )
}

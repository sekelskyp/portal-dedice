import React from 'react'
import { Box, Button, Container, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { route } from '@shared/route'

interface WizardEndProps {
  setStep: (step: number) => void
  resetProgress: () => void
}

export const WizardEnd: React.FC<WizardEndProps> = ({
  setStep,
  resetProgress,
}) => {
  const handleGoBack = () => {
    resetProgress()
    setStep(3)
  }

  return (
    <Box p={4} bg="bg.panel" borderRadius="xl">
      <Container maxW="container.lg" p={8}>
        <VStack gap={8}>
          <Text fontSize="4xl" fontWeight="bold">
            Řešíte aktuálně dědické řízení?
          </Text>
          <Text fontSize="xl">
            Komunikujte s notářem a ostatními dědici v řešení pro předběžné
            šetření. Zaregistujte se a získejte přístup k nástroji.
          </Text>
          <Button
            asChild
            colorScheme="teal"
            fontSize={{ base: 'sm', sm: 'md' }}
            size={{ base: 'sm', sm: 'lg' }}
          >
            <Link to={route.signUp()}>Zaregistrujte se</Link>
          </Button>
          <Text fontSize="xl">Již máte účet?</Text>
          <Button
            asChild
            colorScheme="teal"
            fontSize={{ base: 'sm', sm: 'md' }}
            size={{ base: 'sm', sm: 'lg' }}
          >
            <Link to={route.signIn()}>Přihlašte se</Link>
          </Button>
          <Text fontSize="xl">Chcete vyzkoušet modelaci řízení?</Text>
          <Button
            colorScheme="teal"
            fontSize={{ base: 'sm', sm: 'md' }}
            size={{ base: 'sm', sm: 'lg' }}
            asChild
          >
            <Link to={route.inheritance()}>
              Vypořádání pozůstalosti nanečisto
            </Link>
          </Button>
        </VStack>
      </Container>
      <Container justifyItems={'left'}>
        <Button
          fontSize={{ base: 'sm', sm: 'md' }}
          size={{ base: 'sm', sm: 'lg' }}
          bg="gray.500"
          onClick={handleGoBack}
        >
          Zpět na začátek
        </Button>
      </Container>
    </Box>
  )
}

import { ReactNode } from 'react'
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'

import { useWizard } from '../useWizard'

interface StepLayoutProps {
  children: ReactNode
  title: string
  description?: string
}

export const StepLayout = ({
  children,
  title,
  description,
}: StepLayoutProps) => {
  const { currentStep } = useWizard()

  return (
    <Container maxW="6xl" py={8}>
      <VStack gap={6} align="stretch">
        <Box
          p={8}
          bg="white"
          borderRadius="xl"
          boxShadow="lg"
          border="1px"
          borderColor="gray.200"
        >
          <VStack align="start" gap={4} mb={6}>
            <Heading size="lg">{title}</Heading>
            {description && (
              <Text color="gray.600" fontSize="md">
                {description}
              </Text>
            )}
          </VStack>
          {children}
        </Box>
        <Text textAlign="center" color="gray.500" fontSize="sm">
          Krok {currentStep} ze 3
        </Text>
      </VStack>
    </Container>
  )
}

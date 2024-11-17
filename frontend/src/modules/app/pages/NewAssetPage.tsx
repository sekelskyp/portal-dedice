import React, { useState } from 'react'
import { Box, Container, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { useMediaQuery } from 'usehooks-ts'

import { Page } from '@frontend/shared/layout/Page'

import { AssetForm, AssetFormData, AssetSummary } from './AssetForm'

export const NewAssetPage = () => {
  const [summary, setSummary] = useState<AssetSummary | null>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const handleFormSubmit = (data: AssetFormData) => {
    console.log('Form data:', data)
    setSummary({ onSubmit: () => {}, ...data })
  }

  return (
    <Page>
      {isMobile ? (
        <VStack
          borderWidth={1}
          gap={6}
          borderRadius={4}
          py={4}
          justifyContent={'center'}
        >
          <Container>
            <Heading size={'4xl'}>Určení Majetku</Heading>
            <Text>
              Formulář pro určení majetku zůstavitele. V případě, že zůstavitel
              nevlastní některé z typu majetku, zaškrtněte "Ne".
            </Text>
          </Container>
          <Container maxW="container.lg">
            <AssetForm onSubmit={handleFormSubmit} />
            {summary && (
              <Box mt={6} p={4} borderWidth="1px" borderRadius="md">
                <Heading size="md" mb={4}>
                  Souhrn majetku
                </Heading>
                <pre>{JSON.stringify(summary, null, 2)}</pre>
              </Box>
            )}
          </Container>
        </VStack>
      ) : (
        <HStack flex={1} borderWidth={1} gap={6} borderRadius={4} py={4}>
          <Container maxW={'30%'}>
            <Heading size={'4xl'}>Určení Majetku</Heading>
            <Text fontSize={{ base: 'lg', md: 'sm' }}>
              Formulář pro určení majetku zůstavitele. V případě, že zůstavitel
              nevlastní některé z typu majetku, zaškrtněte "Ne".
            </Text>
          </Container>
          <Container maxW="container.lg" flex={2}>
            <AssetForm onSubmit={handleFormSubmit} />
            {summary && (
              <Box mt={6} p={4} borderWidth="1px" borderRadius="md">
                <Heading size="md" mb={4}>
                  Souhrn majetku
                </Heading>
                <pre>{JSON.stringify(summary, null, 2)}</pre>
              </Box>
            )}
          </Container>
        </HStack>
      )}
    </Page>
  )
}

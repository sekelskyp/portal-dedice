import React, { useState } from 'react'
import { Box, Heading } from '@chakra-ui/react'

import { Page } from '@frontend/shared/layout/Page'

import { AssetForm, AssetFormData, AssetSummary } from './AssetForm'

export const AssetPage = () => {
  const [summary, setSummary] = useState<AssetSummary | null>(null)

  const handleFormSubmit = (data: AssetFormData) => {
    console.log('Form data:', data)
    setSummary({ onSubmit: () => {}, ...data })
  }

  return (
    <Page>
      <Heading mb={6}>Určení Majetku</Heading>
      <AssetForm onSubmit={handleFormSubmit} />
      {summary && (
        <Box mt={6} p={4} borderWidth="1px" borderRadius="md">
          <Heading size="md" mb={4}>
            Souhrn majetku
          </Heading>
          <pre>{JSON.stringify(summary, null, 2)}</pre>
        </Box>
      )}
    </Page>
  )
}

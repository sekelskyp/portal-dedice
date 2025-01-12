import { useCallback } from 'react'
import { Box, Text, VStack } from '@chakra-ui/react'
import { createListCollection } from '@chakra-ui/react/collection'
import { useFormContext } from 'react-hook-form'

import { AssetCard } from './components/AssetCard'
import { FormData, StepProps } from './FormData'
import { StepNavigation } from './StepNavigation'

export const StepThree = ({ onPrevious, onNext }: StepProps) => {
  const { getValues } = useFormContext<FormData>()
  const heirs = getValues().heirs
  const assets = getValues().assets

  const getHeirCollection = useCallback(
    (isIndivisible: boolean) => {
      if (!heirs) {
        console.warn('No heirs available for collection')
        return createListCollection({ items: [] })
      }

      return createListCollection({
        items: isIndivisible
          ? heirs.map((heir) => ({
              value: heir.id || '',
              label: heir.label,
            }))
          : [
              { value: 'all', label: 'Všichni dědicové rovným dílem' },
              ...heirs.map((heir) => ({
                value: heir.id || '',
                label: heir.label,
              })),
            ],
      })
    },
    [heirs]
  )

  return (
    <VStack gap={6} align="stretch" w="full">
      {assets ? (
        assets.map((asset, index) => (
          <AssetCard
            key={index}
            asset={asset}
            index={index}
            getHeirCollection={getHeirCollection}
          />
        ))
      ) : (
        <Box p={4} bg="gray.50" borderRadius="md">
          <Text>Nebyly přidány žádné položky majetku.</Text>
        </Box>
      )}

      <StepNavigation
        onPrevious={onPrevious}
        onNext={onNext}
        isFirstStep={false}
        isLastStep={false}
      />
    </VStack>
  )
}

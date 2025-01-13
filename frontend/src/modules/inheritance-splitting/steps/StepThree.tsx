import { useCallback } from 'react'
import { Box, Text, VStack } from '@chakra-ui/react'
import { createListCollection } from '@chakra-ui/react/collection'
import { useFormContext } from 'react-hook-form'

import { AssetCard } from '../components/AssetCard'
import { StepNavigation } from '../components/StepNavigation'
import { FormData, StepProps } from '../data/FormData'

export const StepThree = ({ onPrevious, onNext }: StepProps) => {
  const { getValues } = useFormContext<FormData>()
  const heirs = getValues().heirs
  const assets = getValues().assets

  const getHeirCollection = useCallback(
    (isIndivisible: boolean) => {
      if (!heirs) {
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
    <VStack gap={[4, 6]} align="stretch" w="full" px={[2, 0]}>
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
        <Box p={[3, 4]} bg="gray.50" borderRadius="md">
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

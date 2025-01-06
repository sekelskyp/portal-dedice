import { Box, Text, VStack } from '@chakra-ui/react'
import { createListCollection } from '@chakra-ui/react/collection'
import { useFormContext } from 'react-hook-form'

import { AssetCard } from './components/AssetCard'
import { FormData, StepProps } from './FormData'
import { StepNavigation } from './StepNavigation'
import { useWizard } from './useWizard'

export const StepThree = ({ onPrevious, onNext }: StepProps) => {
  const { watch } = useFormContext<FormData>()
  const { formData } = useWizard()

  const heirs = formData.heirs || []
  const assets = watch('assets') || []

  const getHeirCollection = (isIndivisible: boolean) => {
    if (isIndivisible) {
      return createListCollection({
        items: heirs.map((heir) => ({
          value: heir.id,
          label: heir.label,
        })),
      })
    }
    return createListCollection({
      items: [
        { value: 'all', label: 'Všichni dědicové rovným dílem' },
        ...heirs.map((heir) => ({
          value: heir.id,
          label: heir.label,
        })),
      ],
    })
  }

  return (
    <VStack gap={6} align="stretch" w="full">
      {assets.length > 0 ? (
        assets.map((asset, index) => (
          <AssetCard
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
        isLastStep={true}
      />
    </VStack>
  )
}

import { useCallback, useMemo } from 'react'
import { Box, Text, VStack } from '@chakra-ui/react'
import { createListCollection } from '@chakra-ui/react/collection'
import { useFormContext, useWatch } from 'react-hook-form'

import { AssetCard } from './components/AssetCard'
import { FormData, StepProps } from './FormData'
import { StepNavigation } from './StepNavigation'

export const StepThree = ({ onPrevious, onNext }: StepProps) => {
  //const { formData } = useWizard()
  const { watch, control, getValues } = useFormContext<FormData>()

  const formData = getValues()
  //console.log(allValues)

  const watchedHeirs = useWatch({ control, name: 'heirs' })
  const heirs = useMemo(() => {
    return watchedHeirs || formData.heirs || []
  }, [watchedHeirs, formData.heirs])
  const assets = watch('assets') || []

  const getHeirCollection = useCallback(
    (isIndivisible: boolean) => {
      if (!heirs.length) {
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
      {assets.length > 0 ? (
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

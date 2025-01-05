import { Box, HStack, VStack } from '@chakra-ui/react'
import { createListCollection } from '@chakra-ui/react/collection'
import { useFormContext } from 'react-hook-form'

import { SelectFormControl } from '@frontend/shared/forms'

import { StepNavigation } from './StepNavigation'

interface FormData {
  childrenCount: string
  hasChildren: string
  hasSpouse: string
  hasParents: string
  hasSiblings: string
  siblingsCount: string
  assets: { type: string; name: string; isShared: boolean; value: number }[]
  heirs: string[]
}

interface StepThreeProps {
  onPrevious: () => void
  onNext: () => void
}

export const StepThree = ({ onPrevious, onNext }: StepThreeProps) => {
  const { watch } = useFormContext<FormData>()

  const heirs = watch('heirs') || []
  const assets = watch('assets') || []

  const getHeirLabel = (heir: string) => {
    if (heir === 'spouse') return 'Manžel/ka'

    if (heir.startsWith('child')) {
      const childNumber = heir.replace('child', '')

      return `Dítě ${childNumber}`
    }

    return heir
  }

  return (
    <VStack gap={4} align="start">
      {assets.length > 0 ? (
        assets.map((asset, index) => (
          <HStack key={index} gap={4} align="center">
            <Box>
              <strong>Typ:</strong> {asset.type || 'Neuvedeno'}
            </Box>

            <Box>
              <strong>Název:</strong> {asset.name || 'Neuvedeno'}
            </Box>

            <Box>
              <strong>Vlastnictví:</strong>{' '}
              {asset.isShared ? 'Společné' : 'Individuální'}
            </Box>

            <Box>
              <strong>Hodnota:</strong> {asset.value || '0'} Kč
            </Box>

            <Box>
              <strong>Dělitelnost:</strong>{' '}
              {asset.type === 'cenné papíry' || asset.type === 'vozidlo'
                ? 'Ne'
                : 'Ano'}
            </Box>

            <SelectFormControl
              label="Návrh rozdělení"
              name={`assets.${index}.heir`}
              collection={createListCollection({
                items: [
                  { value: 'all', label: 'Všichni dědicové' },

                  ...heirs.map((heir) => ({
                    value: heir,

                    label: getHeirLabel(heir),
                  })),
                ],
              })}
              placeholder="Vyberte dědice"
              required
            />
          </HStack>
        ))
      ) : (
        <Box>Nebyly přidány žádné položky majetku.</Box>
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

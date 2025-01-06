import { Box, Grid, Text, VStack } from '@chakra-ui/react'
import { createListCollection } from '@chakra-ui/react/collection'
import { useFormContext } from 'react-hook-form'

import { SelectFormControl } from '@frontend/shared/forms'

import { FormData } from './FormData'
import { StepNavigation } from './StepNavigation'
import { useWizard } from './useWizard' // Updated import path

// Remove duplicate FormData interface

interface StepThreeProps {
  onPrevious: () => void
  onNext: () => void
}

export const StepThree = ({ onPrevious, onNext }: StepThreeProps) => {
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
          <Box key={index} p={4} borderRadius="md" bg="gray.50" shadow="sm">
            <Grid templateColumns="repeat(3, 1fr)" gap={6} mb={4}>
              <Box>
                <Text color="gray.600" fontSize="sm" mb={1}>
                  Typ
                </Text>
                <Text>{asset.type || 'Neuvedeno'}</Text>
              </Box>

              <Box>
                <Text color="gray.600" fontSize="sm" mb={1}>
                  Název
                </Text>
                <Text>{asset.name || 'Neuvedeno'}</Text>
              </Box>

              <Box>
                <Text color="gray.600" fontSize="sm" mb={1}>
                  Vlastnictví
                </Text>
                <Text>{asset.isShared ? 'Společné' : 'Individuální'}</Text>
              </Box>

              <Box>
                <Text color="gray.600" fontSize="sm" mb={1}>
                  Hodnota
                </Text>
                <Text>{asset.value || '0'} Kč</Text>
              </Box>

              <Box>
                <Text color="gray.600" fontSize="sm" mb={1}>
                  Dělitelnost
                </Text>
                <Text>
                  {asset.type === 'cenné papíry' || asset.type === 'vozidlo'
                    ? 'Ne'
                    : 'Ano'}
                </Text>
              </Box>

              <Box>
                <SelectFormControl
                  label="Návrh rozdělení"
                  name={`assets.${index}.heir`}
                  collection={getHeirCollection(
                    asset.type === 'cenné papíry' || asset.type === 'vozidlo'
                  )}
                  placeholder="Vyberte dědice"
                  required
                />
              </Box>
            </Grid>
          </Box>
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

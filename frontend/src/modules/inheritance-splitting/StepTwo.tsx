import { Button, HStack, VStack } from '@chakra-ui/react'
import { createListCollection } from '@chakra-ui/react/collection'
import { useFormContext } from 'react-hook-form'
import { FaPlus } from 'react-icons/fa'

import { InputFormControl, SelectFormControl } from '@frontend/shared/forms'

import { FormData } from './FormData'
import { StepNavigation } from './StepNavigation'

// Remove duplicate FormData interface and keep only the import

const assetTypeCollection = createListCollection({
  items: [
    { value: 'běžný účet', label: 'Běžný účet' },
    { value: 'spořící účet', label: 'Spořící účet' },
    { value: 'termínovaný vklad', label: 'Termínovaný vklad' },
    { value: 'stavební spoření', label: 'Stavební spoření' },
    { value: 'cenné papíry', label: 'Cenné papíry' },
    { value: 'cennosti', label: 'Cennosti' },
    { value: 'hotovost', label: 'Hotovost' },
    { value: 'přeplatky energií', label: 'Přeplatky energií' },
    { value: 'vozidlo', label: 'Vozidlo' },
    { value: 'nemovitost', label: 'Nemovitost' },
  ],
})

interface StepTwoProps {
  onPrevious: () => void
  onNext: () => void
}

export const StepTwo = ({ onPrevious, onNext }: StepTwoProps) => {
  const { watch, setValue } = useFormContext<FormData>()

  return (
    <VStack gap={8} align="stretch" width="100%">
      {watch('assets')?.map((_, index) => (
        <VStack key={index} gap={6} align="stretch" width="100%">
          <SelectFormControl
            label="Typ položky"
            name={`assets.${index}.type`}
            collection={assetTypeCollection}
            placeholder="Vyberte typ"
            required
          />
          <HStack gap={6} align="start">
            <InputFormControl
              label="Název položky"
              name={`assets.${index}.name`}
              required
            />
            <InputFormControl
              label="Hodnota položky (Kč)"
              name={`assets.${index}.value`}
              inputProps={{ type: 'number' }}
              required
            />
          </HStack>
        </VStack>
      ))}
      <Button
        alignSelf="flex-start"
        onClick={() => {
          const assets = watch('assets') || []
          setValue('assets', [
            ...assets,
            { type: '', name: '', value: '', isShared: true },
          ])
        }}
      >
        <FaPlus />
        Přidat položku
      </Button>
      <StepNavigation
        onPrevious={onPrevious}
        onNext={onNext}
        isFirstStep={false}
        isLastStep={false}
      />
    </VStack>
  )
}

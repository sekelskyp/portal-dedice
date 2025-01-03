import { Button, HStack, VStack } from '@chakra-ui/react'
import { createListCollection } from '@chakra-ui/react/collection'
import { useFormContext } from 'react-hook-form'
import { FaPlus } from 'react-icons/fa'

import { InputFormControl, SelectFormControl } from '@frontend/shared/forms'

import { StepNavigation } from './StepNavigation'

interface FormData {
  childrenCount: string
  hasChildren: string
  hasSpouse: string
  hasParents: string
  hasSiblings: string
  siblingsCount: string
  heirs: string[]
  assets: Array<{
    type: string
    name: string
    value: string
    isShared: boolean
  }>
}   

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
    <VStack gap={4} align="start">
      {watch('assets')?.map((_, index) => (
        <HStack key={index} gap={4} align="center">
          <SelectFormControl
            label="Typ položky"
            name={`assets.${index}.type`}
            collection={assetTypeCollection}
            placeholder="Vyberte typ"
            required
          />
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
      ))}
      <Button
        onClick={() => {
          const assets = watch('assets') || []
          setValue('assets', [
            ...assets,
            { type: '', name: '', value: '', isShared: true },
          ])
        }}
      >
        <FaPlus />
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

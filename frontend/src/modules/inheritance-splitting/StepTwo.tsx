import { useEffect } from 'react'
import { HStack, IconButton, VStack } from '@chakra-ui/react'
import { createListCollection } from '@chakra-ui/react/collection'
import { useFormContext } from 'react-hook-form'
import { FaPlus } from 'react-icons/fa'

import { Checkbox } from '@frontend/shared/design-system/atoms/chakra/checkbox'
import { InputFormControl, SelectFormControl } from '@frontend/shared/forms'

import { FormData, StepProps } from './FormData'
import { StepNavigation } from './StepNavigation'

const assetTypeCollection = createListCollection({
  items: [
    { value: 'Běžný účet', label: 'Běžný účet' },
    { value: 'Spořící účet', label: 'Spořící účet' },
    { value: 'Termínovaný vklad', label: 'Termínovaný vklad' },
    { value: 'Stavební spoření', label: 'Stavební spoření' },
    { value: 'Cenné papíry', label: 'Cenné papíry' },
    { value: 'Cennosti', label: 'Cennosti' },
    { value: 'Hotovost', label: 'Hotovost' },
    { value: 'Přeplatky energií', label: 'Přeplatky energií' },
    { value: 'Vozidlo', label: 'Vozidlo' },
    { value: 'Nemovitost', label: 'Nemovitost' },
  ],
})

export const StepTwo = ({ onPrevious, onNext }: StepProps) => {
  const { watch, setValue } = useFormContext<FormData>()
  const hasSpouse = watch('hasSpouse')

  useEffect(() => {
    if (hasSpouse === 'ne') {
      const assets = watch('assets') || []
      assets.forEach((_, index) => {
        setValue(`assets.${index}.isShared`, false)
      })
    }
  }, [hasSpouse, setValue, watch])

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
          <Checkbox
            inputProps={{
              name: `assets.${index}.isShared`,
              checked: watch(`assets.${index}.isShared`),
              onChange: (e) =>
                setValue(`assets.${index}.isShared`, e.target.checked),
              disabled: hasSpouse === 'ne',
            }}
          >
            Společné jmění manželů
          </Checkbox>
        </VStack>
      ))}
      <IconButton
        alignSelf="flex-start"
        onClick={() => {
          const assets = watch('assets') || []
          setValue('assets', [
            ...assets,
            { type: '', name: '', value: '', isShared: true },
          ])
        }}
        p={4}
      >
        <FaPlus />
        Přidat položku
      </IconButton>
      <StepNavigation
        onPrevious={onPrevious}
        onNext={onNext}
        isFirstStep={false}
        isLastStep={false}
      />
    </VStack>
  )
}

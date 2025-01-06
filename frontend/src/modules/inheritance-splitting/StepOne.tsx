import { FormEvent } from 'react'
import { VStack } from '@chakra-ui/react'
import { createListCollection } from '@chakra-ui/react/collection'
import { useFormContext } from 'react-hook-form'

import { SelectFormControl } from '@frontend/shared/forms'

import { BinaryRadioGroup } from './components/BinaryRadioGroup'
import { FormData } from './FormData'
import { StepNavigation } from './StepNavigation'

const childrenCountCollection = createListCollection({
  items: Array.from({ length: 10 }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString(),
  })),
})

const siblingsCountCollection = createListCollection({
  items: Array.from({ length: 10 }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString(),
  })),
})

interface StepOneProps {
  onPrevious: () => void
  onNext: () => void
}

export const StepOne = ({ onPrevious, onNext }: StepOneProps) => {
  const { watch, setValue } = useFormContext<FormData>()

  const handleRadioChange =
    (fieldName: keyof FormData) => (event: FormEvent<HTMLDivElement>) => {
      const value = (event.target as HTMLInputElement).value
      setValue(fieldName, value)
    }

  const hasChildren = watch('hasChildren')
  const hasParents = watch('hasParents')
  const hasSiblings = watch('hasSiblings')

  return (
    <VStack align="stretch" gap={6}>
      <BinaryRadioGroup
        name="hasChildren"
        label="Má zůstavitel/ka potomky?"
        onChange={handleRadioChange('hasChildren')}
        required
      />
      {hasChildren === 'yes' && (
        <SelectFormControl
          name="childrenCount"
          label="Počet dětí"
          collection={childrenCountCollection}
          placeholder="Vyberte počet"
          required
        />
      )}

      {hasChildren === 'no' && (
        <>
          <BinaryRadioGroup
            name="hasParents"
            label="Má zůstavitel/ka žijící rodiče?"
            onChange={handleRadioChange('hasParents')}
            required
          />

          {hasParents === 'no' && (
            <>
              <BinaryRadioGroup
                name="hasSiblings"
                label="Má zůstavitel/ka sourozence?"
                onChange={handleRadioChange('hasSiblings')}
                required
              />

              {hasSiblings === 'yes' && (
                <SelectFormControl
                  name="siblingsCount"
                  label="Počet sourozenců"
                  collection={siblingsCountCollection}
                  placeholder="Vyberte počet"
                  required
                />
              )}
            </>
          )}
        </>
      )}
      <BinaryRadioGroup
        name="hasSpouse"
        label="Má zůstavitel/ka manžela/manželku?"
        onChange={handleRadioChange('hasSpouse')}
        required
      />
      <StepNavigation
        onPrevious={onPrevious}
        onNext={onNext}
        isFirstStep={true}
        isLastStep={false}
      />
    </VStack>
  )
}

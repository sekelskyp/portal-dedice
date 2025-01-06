import { VStack } from '@chakra-ui/react'
import { createListCollection } from '@chakra-ui/react/collection'
import { useFormContext, useWatch } from 'react-hook-form'

import { SelectFormControl } from '@frontend/shared/forms'

import { BinaryRadioGroup } from './components/BinaryRadioGroup'
import { FormData, StepProps } from './FormData'
import { StepNavigation } from './StepNavigation'

const countCollection = createListCollection({
  items: Array.from({ length: 10 }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString(),
  })),
})

export const StepOne = ({ onPrevious, onNext }: StepProps) => {
  const { control } = useFormContext<FormData>()

  const [hasChildren, hasParents, hasSiblings] = useWatch({
    control,
    name: ['hasChildren', 'hasParents', 'hasSiblings'],
  })

  return (
    <VStack align="stretch" gap={6}>
      <BinaryRadioGroup
        name="hasChildren"
        label="Má zůstavitel/ka potomky?"
        required
      />

      {hasChildren === 'ano' && (
        <SelectFormControl
          name="childrenCount"
          label="Počet dětí"
          collection={countCollection}
          placeholder="Vyberte počet"
          required
        />
      )}

      {hasChildren === 'ne' && (
        <>
          <BinaryRadioGroup
            name="hasParents"
            label="Má zůstavitel/ka žijící rodiče?"
            required
          />

          {hasParents === 'ne' && (
            <>
              <BinaryRadioGroup
                name="hasSiblings"
                label="Má zůstavitel/ka sourozence?"
                required
              />

              {hasSiblings === 'ano' && (
                <SelectFormControl
                  name="siblingsCount"
                  label="Počet sourozenců"
                  collection={countCollection}
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

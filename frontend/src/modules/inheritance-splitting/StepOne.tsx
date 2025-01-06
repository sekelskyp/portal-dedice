import { useEffect } from 'react'
import { VStack } from '@chakra-ui/react'
import { createListCollection } from '@chakra-ui/react/collection'
import { useFormContext, useWatch } from 'react-hook-form'

import { SelectFormControl } from '@frontend/shared/forms'

import { BinaryRadioGroup } from './components/BinaryRadioGroup'
import { FormData, Heir, StepProps } from './FormData'
import { StepNavigation } from './StepNavigation'

const countCollection = createListCollection({
  items: Array.from({ length: 10 }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString(),
  })),
})

export const StepOne = ({ onPrevious, onNext }: StepProps) => {
  const { control, trigger, setValue, getValues } = useFormContext<FormData>()

  const [hasChildren, hasParents, hasSiblings] = useWatch({
    control,
    name: ['hasChildren', 'hasParents', 'hasSiblings'],
  })

  useEffect(() => {
    trigger(['childrenCount', 'siblingsCount'])
  }, [hasChildren, hasSiblings, trigger])

  const calculateHeirs = () => {
    const newHeirs: Array<Heir> = []
    const {
      hasSpouse,
      hasChildren,
      childrenCount,
      hasParents,
      hasSiblings,
      siblingsCount,
    } = getValues()

    if (hasSpouse === 'ano') {
      newHeirs.push({
        id: 'spouse',
        type: 'spouse',
        label: 'Manžel/ka',
      })
    }

    if (hasChildren === 'ano' && childrenCount) {
      const count = parseInt(String(childrenCount), 10)
      for (let i = 1; i <= count; i++) {
        newHeirs.push({
          id: `child${i}`,
          type: 'child',
          label: `Dítě ${i}`,
        })
      }
    }

    if (hasChildren === 'ne' && hasParents === 'ano') {
      newHeirs.push(
        { id: 'parent1', type: 'parent', label: 'Rodič 1' },
        { id: 'parent2', type: 'parent', label: 'Rodič 2' }
      )
    }

    if (
      hasChildren === 'ne' &&
      hasParents === 'ne' &&
      hasSiblings === 'ano' &&
      siblingsCount
    ) {
      const count = parseInt(String(siblingsCount), 10)
      for (let i = 1; i <= count; i++) {
        newHeirs.push({
          id: `sibling${i}`,
          type: 'sibling',
          label: `Sourozenec ${i}`,
        })
      }
    }

    return newHeirs
  }

  const handleNextStep = async () => {
    const isValid = await trigger()
    if (isValid) {
      const newHeirs = calculateHeirs()
      console.log('Setting heirs:', newHeirs)
      setValue('heirs', newHeirs, { shouldValidate: true })
      onNext()
    }
  }

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
        onNext={handleNextStep}
        isFirstStep={true}
        isLastStep={false}
      />
    </VStack>
  )
}

import { useEffect } from 'react'
import { VStack } from '@chakra-ui/react'
import { createListCollection } from '@chakra-ui/react/collection'
import { useFormContext, useWatch } from 'react-hook-form'

import { CheckboxFormControl, SelectFormControl } from '@frontend/shared/forms'

import { BinaryRadioGroup } from '../components/BinaryRadioGroup'
import { StepNavigation } from '../components/StepNavigation'
import { FormData, Heir, StepProps } from '../data/FormData'

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
      hasLivedWithDeceased,
      hasMother,
      hasFather,
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
      if (hasMother) {
        newHeirs.push({ id: 'mother', type: 'parent', label: 'Matka' })
      }
      if (hasFather) {
        newHeirs.push({ id: 'father', type: 'parent', label: 'Otec' })
      }
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

    if (hasChildren === 'ne' && hasLivedWithDeceased === 'ano') {
      newHeirs.push({
        id: 'cohabitant',
        type: 'cohabitant',
        label: 'Osoba žijící se zůstavitelem po dobu nejméně jednoho roku',
      })
    }

    return newHeirs
  }

  const handleNextStep = async () => {
    const isValid = await trigger()
    if (isValid) {
      const newHeirs = calculateHeirs()
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
            name="hasLivedWithDeceased"
            label="Žila se zůstavitelem/kou nějaká osoba ve společné domácnosti po dobu nejméně jednoho roku?"
            required
          />

          <BinaryRadioGroup
            name="hasParents"
            label="Má zůstavitel/ka žijící rodiče?"
            required
          />

          {hasParents === 'ano' && (
            <>
              <CheckboxFormControl name="hasMother" label="Matka žije" />
              <CheckboxFormControl name="hasFather" label="Otec žije" />
            </>
          )}

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

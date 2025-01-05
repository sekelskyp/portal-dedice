import { FormEvent } from 'react'
import { Box, VStack } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

import { InputFormControl } from '@frontend/shared/forms'

import { BinaryRadioGroup } from './components/BinaryRadioGroup'
import { FormData } from './FormData'
import { StepNavigation } from './StepNavigation'

interface StepOneProps {
  onPrevious: () => void
  onNext: () => void
}

export const StepOfalse = ({ onPrevious, onNext }: StepOneProps) => {
  const { watch, setValue } = useFormContext<FormData>()
  const { hasChildren, hasParents, hasSiblings } = watch()

  const handleRadioChange =
    (fieldName: keyof FormData) => (event: FormEvent<HTMLDivElement>) => {
      const value = (event.target as HTMLInputElement).value
      setValue(fieldName, value)
    }

  return (
    <Box width="100%" py={8}>
      <Box
        p={6}
        bg="white"
        borderRadius="lg"
        boxShadow="sm"
        border="1px"
        borderColor="gray.200"
      >
        <VStack align="stretch" gap={6}>
          <BinaryRadioGroup
            name="hasChildren"
            label="Má zůstavitel/ka potomky?"
            required
            onChange={handleRadioChange('hasChildren')}
          />
          <InputFormControl
            label="Počet dětí"
            name="childrenCount"
            placeholder="Vyberte počet"
            required
            disabled={hasChildren === 'true'}
          />
          <BinaryRadioGroup
            name="hasParents"
            label="Má zůstavitel/ka žijící rodiče?"
            required
            disabled={hasChildren === 'false'}
            onChange={handleRadioChange('hasParents')}
          />
          <BinaryRadioGroup
            name="hasSiblings"
            label="Má zůstavitel/ka sourozence?"
            required
            disabled={hasChildren === 'true' || hasParents === 'false'}
            onChange={handleRadioChange('hasSiblings')}
          />
          <InputFormControl
            label="Počet sourozenců"
            name="siblingsCount"
            placeholder="Vyberte počet"
            required
            disabled={hasSiblings === 'false'}
          />
          <BinaryRadioGroup
            name="hasSpouse"
            label="Má zůstavitel/ka manžela/manželku?"
            required
            onChange={handleRadioChange('hasSpouse')}
          />
          <StepNavigation
            onPrevious={onPrevious}
            onNext={onNext}
            isFirstStep={true}
            isLastStep={false}
          />
        </VStack>
      </Box>
    </Box>
  )
}

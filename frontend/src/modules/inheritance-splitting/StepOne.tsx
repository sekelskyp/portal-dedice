import { Box, VStack } from '@chakra-ui/react'
import { createListCollection } from '@chakra-ui/react/collection'
import { Controller, useFormContext } from 'react-hook-form'

import { Radio } from '@frontend/shared/design-system'
import {
  RadioGroupFormControl,
  SelectFormControl,
} from '@frontend/shared/forms'

import { StepNavigation } from './StepNavigation'

interface FormData {
  childrenCount: string
  hasChildren: string
  hasSpouse: string
  hasParents: string
  hasSiblings: string
  siblingsCount: string
}

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
  const { watch, control } = useFormContext<FormData>()

  const hasChildren = watch('hasChildren')
  //const childrenCount = watch('childrenCount')
  //const hasSpouse = watch('hasSpouse')
  const hasParents = watch('hasParents')
  const hasSiblings = watch('hasSiblings')

  // Remove the defaultValues since they're now handled in InheritanceModel

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
          <Controller
            name="hasChildren"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <RadioGroupFormControl
                label="Má zůstavitel/ka potomky?"
                required
                {...field}
              >
                <Radio value="yes">Ano</Radio>
                <Radio value="no">Ne</Radio>
              </RadioGroupFormControl>
            )}
          />

          {hasChildren === 'yes' && (
            <Controller
              name="childrenCount"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <SelectFormControl
                  label="Počet dětí"
                  collection={childrenCountCollection}
                  placeholder="Vyberte počet"
                  required
                  onChange={field.onChange}
                  value={[field.value]}
                  name={field.name}
                />
              )}
            />
          )}

          {hasChildren === 'no' && (
            <>
              <Controller
                name="hasParents"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <RadioGroupFormControl
                    label="Má zůstavitel/ka žijící rodiče?"
                    required
                    {...field}
                    value={field.value?.toString()}
                  >
                    <Radio value="yes">Ano</Radio>
                    <Radio value="no">Ne</Radio>
                  </RadioGroupFormControl>
                )}
              />

              {hasParents === 'no' && (
                <>
                  <Controller
                    name="hasSiblings"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <RadioGroupFormControl
                        label="Má zůstavitel/ka sourozence?"
                        required
                        {...field}
                        value={field.value?.toString()}
                      >
                        <Radio value="yes">Ano</Radio>
                        <Radio value="no">Ne</Radio>
                      </RadioGroupFormControl>
                    )}
                  />

                  {hasSiblings === 'yes' && (
                    <Controller
                      name="siblingsCount"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <SelectFormControl
                          label="Počet sourozenců"
                          collection={siblingsCountCollection}
                          placeholder="Vyberte počet"
                          required
                          onChange={field.onChange}
                          value={[field.value]}
                          name={field.name}
                        />
                      )}
                    />
                  )}
                </>
              )}
            </>
          )}

          <Controller
            name="hasSpouse"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <RadioGroupFormControl
                label="Má zůstavitel/ka manžela/manželku?"
                required
                {...field}
              >
                <Radio value="yes">Ano</Radio>
                <Radio value="no">Ne</Radio>
              </RadioGroupFormControl>
            )}
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

import React from 'react'
import { Button, HStack, VStack } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'
import { FaPlus, FaTrash } from 'react-icons/fa'

import resources from '@frontend/resources'
import { InputFormControl } from '@frontend/shared/forms/InputFormControl'

import { useAssetSection } from '../hooks/useAssetSection'

import { Section } from './Sections'

interface CompanySectionProps {
  selected: boolean
  setSelected: React.Dispatch<React.SetStateAction<boolean>>
}

export const CompanySection: React.FC<CompanySectionProps> = ({
  selected,
  setSelected,
}) => {
  const { fields, append, remove, setValue, watch } = useAssetSection(
    'company',
    selected,
    { ico: '' }
  )

  const company = watch('company')
  const hasExistingData =
    company &&
    company.length > 0 &&
    company.some((item: { ico: string }) => item.ico)

  return (
    <Section
      title={resources.portal.forms.assetForm.groups.company}
      selected={selected}
      setSelected={setSelected}
      clearFields={() => setValue('company', [])}
      hideSwitch={hasExistingData}
    >
      {!selected && (
        <>
          {fields.map((field, index) => (
            <React.Fragment key={field.id}>
              <VStack gap={4} width="100%" mb={4}>
                <HStack width="100%" alignItems="flex-start">
                  <Controller
                    name={`company.${index}.ico`}
                    render={({ field }) => (
                      <InputFormControl
                        {...field}
                        label="IČO společnosti"
                        placeholder="Zadejte 8místné IČO"
                        width="100%"
                        required
                      />
                    )}
                  />
                </HStack>
                <HStack width="100%" justifyContent="space-between">
                  <Button onClick={() => append({ ico: '' })} size="sm">
                    <FaPlus />
                  </Button>
                  {fields.length > 1 && (
                    <Button
                      aria-label="Remove company"
                      onClick={() => remove(index)}
                      bg="red.500"
                      size="sm"
                    >
                      <FaTrash />
                    </Button>
                  )}
                </HStack>
              </VStack>
            </React.Fragment>
          ))}
        </>
      )}
    </Section>
  )
}

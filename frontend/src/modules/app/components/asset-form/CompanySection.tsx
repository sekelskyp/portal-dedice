import React from 'react'
import { Button, HStack } from '@chakra-ui/react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { FaPlus, FaTrash } from 'react-icons/fa'

import resources from '@frontend/resources'
import { InputFormControl } from '@frontend/shared/forms/InputFormControl'

import { Section } from './Sections'

interface CompanySectionProps {
  selected: boolean
  setSelected: React.Dispatch<React.SetStateAction<boolean>>
}

export const CompanySection: React.FC<CompanySectionProps> = ({
  selected,
  setSelected,
}) => {
  const { setValue, control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'company',
  })

  const clearFields = () => {
    setValue('company', [])
  }

  return (
    <Section
      title={resources.portal.forms.assetForm.groups.company}
      selected={selected}
      setSelected={setSelected}
      clearFields={clearFields}
    >
      {!selected && (
        <>
          {fields.map((field, index) => (
            <React.Fragment key={field.id}>
              <HStack>
                <Controller
                  name={`company.${index}.ico`}
                  render={({ field }) => (
                    <InputFormControl
                      {...field}
                      label="Obchodní společnost (IČO)"
                      placeholder="Zadejte IČO"
                    />
                  )}
                />
              </HStack>
              <HStack my={2} justifyContent={'space-between'}>
                <Button onClick={() => append({ ico: '' })} width="fit-content">
                  <FaPlus />
                </Button>
                {fields.length > 1 && (
                  <Button
                    aria-label="Remove company"
                    onClick={() => remove(index)}
                    bg={'red'}
                    alignSelf="flex-end"
                  >
                    <FaTrash />
                  </Button>
                )}
              </HStack>
            </React.Fragment>
          ))}
        </>
      )}
    </Section>
  )
}

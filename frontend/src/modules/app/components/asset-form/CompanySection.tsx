import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

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
  const { setValue } = useFormContext()

  const clearFields = () => {
    setValue('company.ico', '')
  }

  return (
    <Section
      title={resources.portal.forms.assetForm.groups.company}
      selected={selected}
      setSelected={setSelected}
      clearFields={clearFields}
    >
      {!selected && (
        <Controller
          name="company.ico"
          render={({ field }) => (
            <InputFormControl
              {...field}
              label="Obchodní společnost (IČO)"
              placeholder="Zadejte IČO"
            />
          )}
        />
      )}
    </Section>
  )
}

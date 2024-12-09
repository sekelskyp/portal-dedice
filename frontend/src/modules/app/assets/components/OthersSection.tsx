import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import resources from '@frontend/resources'
import { InputFormControl } from '@frontend/shared/forms/InputFormControl'

import { Section } from './Sections'

interface OthersSectionProps {
  selected: boolean
  setSelected: React.Dispatch<React.SetStateAction<boolean>>
}

export const OthersSection: React.FC<OthersSectionProps> = ({
  selected,
  setSelected,
}) => {
  const { setValue, watch } = useFormContext()
  const others = watch('others')
  const hasExistingData = others?.description && others.description.length > 0

  const clearFields = () => {
    setValue('others.description', '')
  }

  return (
    <Section
      title={resources.portal.forms.assetForm.groups.others}
      selected={selected}
      setSelected={setSelected}
      clearFields={clearFields}
      hideSwitch={hasExistingData}
    >
      {!selected && (
        <Controller
          name="others.description"
          render={({ field }) => (
            <InputFormControl
              {...field}
              label="Jiné"
              required
              placeholder="Např. hotovost, nebo šperky, obrazy (max. 300 znaků)"
            />
          )}
        />
      )}
    </Section>
  )
}

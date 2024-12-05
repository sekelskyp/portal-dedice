import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import resources from '@frontend/resources'
import { InputFormControl } from '@frontend/shared/forms/InputFormControl'

import { Section } from '../../assets/components/Sections'

interface ValuablesSectionProps {
  selected: boolean
  setSelected: React.Dispatch<React.SetStateAction<boolean>>
}

export const ValuablesSection: React.FC<ValuablesSectionProps> = ({
  selected,
  setSelected,
}) => {
  const { setValue, watch } = useFormContext()
  const valuables = watch('valuables')
  const hasExistingData =
    valuables?.description && valuables.description.length > 0

  const clearFields = () => {
    setValue('valuables.description', '')
  }

  return (
    <Section
      title={resources.portal.forms.assetForm.groups.valuables}
      selected={selected}
      setSelected={setSelected}
      clearFields={clearFields}
      hideSwitch={hasExistingData}
    >
      {!selected && (
        <Controller
          name="valuables.description"
          render={({ field }) => (
            <InputFormControl
              {...field}
              label="Cennosti"
              required
              placeholder="Zadejte jaké cennosti zůstavitel vlastnil (Max. 300 znaků)"
            />
          )}
        />
      )}
    </Section>
  )
}

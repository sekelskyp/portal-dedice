import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import resources from '@frontend/resources'
import { InputFormControl } from '@frontend/shared/forms/InputFormControl'

import { Section } from './Sections'

interface ValuablesSectionProps {
  selected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<boolean>>
}

export const ValuablesSection: React.FC<ValuablesSectionProps> = ({ selected, setSelected }) => {
    const { setValue } = useFormContext()
  
    const clearFields = () => {
        setValue('valuables.description', '')
      }
    
      return (
        <Section
          title={resources.portal.forms.assetForm.groups.valuables}
          selected={selected}
          setSelected={setSelected}
          clearFields={clearFields}
        >
          {!selected && (
            <Controller
              name="valuables.description"
              render={({ field }) => (
                <InputFormControl
                  {...field}
                  placeholder="Zadejte jaké cennosti zůstavitel vlastnil (Max. 300 znaků)"
                />
              )}
            />
          )}
        </Section>
    )
  }
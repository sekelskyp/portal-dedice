import React from 'react'
import { createListCollection } from '@chakra-ui/react/collection'
import { Controller, useFormContext } from 'react-hook-form'

import resources from '@frontend/resources'
import { SelectFormControl } from '@frontend/shared/forms/SelectFormControl'

import { Section } from './Sections'

interface BankAccountSectionProps {
  selected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<boolean>>
  bankAccountCollection: { id: string; name: string }[]; 
}

const bankAccountCollection = createListCollection({
  items: [
    { value: 'Air Bank', label: 'Air Bank' },
    { value: 'Česká spořitelna', label: 'Česká spořitelna' },
    {
      value: 'Československá obchodní banka',
      label: 'Československá obchodní banka',
    },
    { value: 'Equa bank', label: 'Equa bank' },
    { value: 'Fio banka', label: 'Fio banka' },
    { value: 'Komerční banka', label: 'Komerční banka' },
    { value: 'mBank', label: 'mBank' },
    { value: 'Moneta Money Bank', label: 'Moneta Money Bank' },
    { value: 'Raiffeisenbank', label: 'Raiffeisenbank' },
    { value: 'Sberbank CZ', label: 'Sberbank CZ' },
    { value: 'UniCredit Bank', label: 'UniCredit Bank' },
  ],
})



export const BankAccountSection: React.FC<BankAccountSectionProps> = ({
  selected,
  setSelected,
}) => {
  const { setValue } = useFormContext()

  const clearFields = () => {
    setValue('bankAccount.bank', [])
  }


  return (
    <Section
      title={resources.portal.forms.assetForm.groups.bankAccount}
      selected={selected}
      setSelected={setSelected}
      clearFields={clearFields}
    >
      {!selected && (
        <Controller
          name="bankAccount.bank"
          render={({ field }) => (
            <SelectFormControl
              {...field}
              label="Bankovní účet"
              collection={bankAccountCollection}
              placeholder="Vyberte bankovní instituci"
              multiple
            />
          )}
        />
      )}
    </Section>
  )
}
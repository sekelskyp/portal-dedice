import React from 'react'
import { Box, Button } from '@chakra-ui/react'
import { createListCollection } from '@chakra-ui/react/collection'
import { Controller } from 'react-hook-form'
import { FaTimes } from 'react-icons/fa'

import resources from '@frontend/resources'
import { SelectFormControl } from '@frontend/shared/forms/SelectFormControl'

import { Section } from './Sections'
import { useAssetSection } from './useAssetSection'

interface BankAccountSectionProps {
  selected: boolean
  setSelected: React.Dispatch<React.SetStateAction<boolean>>
  bankAccountCollection: { id: string; name: string }[]
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
  const { setValue, watch, clearFields } = useAssetSection(
    'bankAccount',
    selected,
    { bank: [] }
  )

  const bankAccount = watch('bankAccount')
  const hasExistingData = bankAccount?.bank && bankAccount.bank.length > 0

  return (
    <Section
      title={resources.portal.forms.assetForm.groups.bankAccount}
      selected={selected}
      setSelected={setSelected}
      clearFields={clearFields}
      hideSwitch={hasExistingData}
    >
      {!selected && (
        <Box position="relative">
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
          {watch('bankAccount.bank')?.length > 0 && (
            <Button
              position="absolute"
              right="8"
              top="70%"
              transform="translateY(-50%)"
              size="xs"
              variant="ghost"
              p={1}
              minW="auto"
              h="auto"
              color="gray.500"
              _hover={{ color: 'gray.700' }}
              onClick={() => setValue('bankAccount.bank', [])}
            >
              <FaTimes size="10px" />
            </Button>
          )}
        </Box>
      )}
    </Section>
  )
}

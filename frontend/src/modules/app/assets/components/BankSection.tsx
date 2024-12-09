import React from 'react'
import { Box, Button } from '@chakra-ui/react'
import { createListCollection } from '@chakra-ui/react/collection'
import { Controller } from 'react-hook-form'
import { FaTimes } from 'react-icons/fa'

import resources from '@frontend/resources'
import { SelectFormControl } from '@frontend/shared/forms/SelectFormControl'

import { useAssetSection } from '../hooks/useAssetSection'

import { Section } from './Sections'

interface BankAccountSectionProps {
  selected: boolean
  setSelected: React.Dispatch<React.SetStateAction<boolean>>
  bankAccountCollection: { id: string; name: string }[]
}

const bankAccountCollection = createListCollection({
  items: [
    { value: 'Air Bank', label: 'Air Bank' },
    { value: 'Česká spořitelna', label: 'Česká spořitelna' },
    { value: 'ČSOB', label: 'Československá obchodní banka' },
    { value: 'Equa bank', label: 'Equa bank' },
    { value: 'Fio banka', label: 'Fio banka' },
    { value: 'Hello bank', label: 'Hello bank' },
    { value: 'Hypoteční banka', label: 'Hypoteční banka' },
    { value: 'J&T Banka', label: 'J&T Banka' },
    { value: 'Komerční banka', label: 'Komerční banka' },
    { value: 'mBank', label: 'mBank' },
    { value: 'MONETA Money Bank', label: 'MONETA Money Bank' },
    { value: 'PPF banka', label: 'PPF banka' },
    { value: 'Raiffeisenbank', label: 'Raiffeisenbank' },
    { value: 'Trinity Bank', label: 'Trinity Bank' },
    { value: 'UniCredit Bank', label: 'UniCredit Bank' },
  ],
})

export const BankAccountSection: React.FC<BankAccountSectionProps> = ({
  selected,
  setSelected,
}) => {
  const { setValue, watch, clearFields } = useAssetSection(
    'bankAccount.bank',
    selected,
    []
  )

  const bankValues = watch('bankAccount.bank') || []
  const hasExistingData = bankValues.length > 0

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
            defaultValue={[]}
            render={({ field: { onChange, value, ...field } }) => (
              <SelectFormControl
                {...field}
                value={Array.isArray(value) ? value : []}
                onChange={(newValue: unknown) => {
                  onChange(newValue)
                  if (Array.isArray(newValue) && newValue.length > 0) {
                    setSelected(false)
                  }
                }}
                label="Bankovní účet"
                collection={bankAccountCollection}
                placeholder="Vyberte bankovní instituce"
                multiple
                required
              />
            )}
          />
          {bankValues.length > 0 && (
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

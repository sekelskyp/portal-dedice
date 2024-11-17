import { ReactNode } from 'react'
import { Fieldset, HStack } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

import { Stack } from '../design-system'
import { suggestionToAddress } from '../hooks/useAddressSuggestions'

import { AddressFormControl, InputFormControl } from '.'

export const AddressGroupFormControl = ({
  label,
  required,
}: {
  label: ReactNode
  required?: boolean
}) => {
  const { setValue } = useFormContext()

  return (
    <Fieldset.Root>
      <Stack>
        <Fieldset.Legend>{label}</Fieldset.Legend>
        <Fieldset.HelperText fontSize="xs">
          Prosím vyplňte adresu napsáním ulice, čísla popisného a orientačního
          do pole ulice a následného zvolení odpovídající adresy z návrhů.
        </Fieldset.HelperText>
      </Stack>

      <Fieldset.Content>
        <Stack gap={4} w={'full'}>
          <HStack gap={4}>
            <AddressFormControl
              required={required}
              flex={3}
              onSuggestionSelected={(suggestion) => {
                const address = suggestionToAddress(suggestion)
                setValue('addressStreet', address.street, {
                  shouldValidate: true,
                })
                setValue('addressStreetNumber', address.streetNumber, {
                  shouldValidate: true,
                })
                setValue('addressMunicipality', address.municipality, {
                  shouldValidate: true,
                })
                setValue('addressPostCode', address.postCode, {
                  shouldValidate: true,
                })
              }}
              name="addressStreet"
              label="Ulice"
            />
            <InputFormControl
              flex={2}
              required={required}
              name="addressStreetNumber"
              label="Číslo popisné a orientační"
            />
          </HStack>
          <HStack gap={4}>
            <InputFormControl
              flex={3}
              required={required}
              name="addressMunicipality"
              label="Obec"
            />
            <InputFormControl
              flex={2}
              required={required}
              name="addressPostCode"
              label="PSČ"
            />
          </HStack>
        </Stack>
      </Fieldset.Content>
    </Fieldset.Root>
  )
}

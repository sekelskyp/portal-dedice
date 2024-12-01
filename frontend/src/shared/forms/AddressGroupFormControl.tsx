import { ReactNode } from 'react'
import { Fieldset, HStack } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

import { Stack } from '../design-system'

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
        <Stack gap={4} w="full">
          <Stack direction={{ base: 'column', sm: 'row' }} gap={4}>
            <AddressFormControl
              required={required}
              flex={3}
              onSuggestionSelected={(suggestion) => {
                setValue('addressInput', suggestion, {
                  shouldValidate: true,
                })
              }}
              name="addressInput.street"
              label="Ulice"
            />
            <InputFormControl
              flex={2}
              required={required}
              name="addressInput.streetNumber"
              label="Číslo popisné a orientační"
            />
          </Stack>
          <HStack gap={4}>
            <InputFormControl
              flex={2}
              required={required}
              name="addressInput.municipality"
              label="Obec"
            />
            <InputFormControl
              flex={1}
              required={required}
              name="addressInput.postalCode"
              label="PSČ"
            />
          </HStack>
        </Stack>
      </Fieldset.Content>
    </Fieldset.Root>
  )
}

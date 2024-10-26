import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete'
import { Controller, useFormContext } from 'react-hook-form'
import usePlacesAutocomplete from 'use-places-autocomplete'

type PlacesAutoCompleteProps = {
  name: string
  label: string
}

export function PlacesAutoComplete({ name, label }: PlacesAutoCompleteProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const {
    ready,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: 'initMap',
    requestOptions: {
      language: 'cs',
      componentRestrictions: {
        country: 'CZ',
      },
      types: ['address'],
      fields: ['address_components', 'formatted_address', 'place_id'],
    },
    debounce: 300,
  })

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleSelect = (address: string, onChange: (value: string) => void) => {
    setValue(address, false)
    clearSuggestions()
    onChange(address)
  }

  const formatAddress = (description: string): string => {
    const parts = description.split(',')
    return parts
      .slice(0, parts.length - 1)
      .join(',')
      .trim()
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onChange, value } }) => (
        <FormControl isRequired isInvalid={!!errors[name]}>
          <FormLabel>{label}</FormLabel>
          <AutoComplete openOnFocus>
            <AutoCompleteInput
              name={name}
              placeholder="Zadejte adresu..."
              isDisabled={!ready}
              onChange={(e) => {
                handleInput(e)
                onChange(e.target.value)
              }}
              value={value || ''}
            />
            <AutoCompleteList>
              {status === 'OK' &&
                data.map(({ place_id, description }) => {
                  const formattedAddress = formatAddress(description)
                  return (
                    <AutoCompleteItem
                      key={place_id}
                      value={formattedAddress}
                      onClick={() => handleSelect(formattedAddress, onChange)}
                    >
                      {formattedAddress}
                    </AutoCompleteItem>
                  )
                })}
            </AutoCompleteList>
            {errors[name] && (
              <FormErrorMessage>
                {errors[name]?.message?.toString()}
              </FormErrorMessage>
            )}
          </AutoComplete>
        </FormControl>
      )}
    />
  )
}

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
      /* Define search scope here */
      language: 'cs',
      componentRestrictions: {
        country: 'CZ',
      },
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
                data.map(({ place_id, description }) => (
                  <AutoCompleteItem
                    key={place_id}
                    value={description}
                    onClick={() => handleSelect(description, onChange)}
                  >
                    {description}
                  </AutoCompleteItem>
                ))}
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

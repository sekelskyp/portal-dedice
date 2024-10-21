import { FormControl, FormLabel } from '@chakra-ui/react'
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete'
import usePlacesAutocomplete from 'use-places-autocomplete'

type PlacesAutoCompleteProps = {
  name: string
  label: string
}

export function PlacesAutoComplete({ name, label }: PlacesAutoCompleteProps) {
  const {
    ready,
    value,
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

  const handleSelect = (address: string) => {
    setValue(address, false)
    clearSuggestions()
  }

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <AutoComplete openOnFocus>
        <AutoCompleteInput
          name={name}
          placeholder="Zadejte adresu..."
          isDisabled={!ready}
          onChange={handleInput}
          value={value}
        />
        <AutoCompleteList>
          {status === 'OK' &&
            data.map(({ place_id, description }) => (
              <AutoCompleteItem
                key={place_id}
                value={description}
                onClick={() => handleSelect(description)}
              >
                {description}
              </AutoCompleteItem>
            ))}
        </AutoCompleteList>
      </AutoComplete>
    </FormControl>
  )
}

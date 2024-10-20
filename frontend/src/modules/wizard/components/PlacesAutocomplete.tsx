import { Input, Select } from '@chakra-ui/react'
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from '@choc-ui/chakra-autocomplete'
import useOnclickOutside from 'react-cool-onclickoutside'
import usePlacesAutocomplete from 'use-places-autocomplete'

export function PlacesAutocomplete() {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: 'YOUR_CALLBACK_NAME',
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  })

  const ref = useOnclickOutside(() => {
    // When the user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions()
  })

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update the keyword of the input element
    setValue(event.target.value)
  }

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value, false)
  }

  return (
    <>
      <AutoComplete>
        <AutoCompleteInput
          value={value}
          disabled={!ready}
          onChange={handleInput}
        ></AutoCompleteInput>
        <AutoCompleteList onSelect={handleSelect}>
          {status === 'OK' &&
            data.map(({ place_id, description }) => (
              <AutoCompleteItem key={place_id} value={description}>
                {description}
              </AutoCompleteItem>
            ))}
        </AutoCompleteList>
      </AutoComplete>
    </>
  )
}

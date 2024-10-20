import { useState } from 'react'
import useOnclickOutside from 'react-cool-onclickoutside'
import usePlacesAutocomplete, {
  getGeocode,
  // getLatLng,
  getZipCode,
} from 'use-places-autocomplete'

export const PlacesAutocomplete = () => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: 'initMap',
  })
  const [zipCode, setZipCode] = useState<ReturnType<typeof getZipCode>>()
  const ref = useOnclickOutside(() => {
    // When the user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions()
  })

  const handleInput = (e: any) => {
    // Update the keyword of the input element
    setValue(e.target.value)
  }

  const handleSelect =
    ({ description }: { description: string }) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false)
      clearSuggestions()

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        // const { lat, lng } = getLatLng(results[0])
        // console.log('Zip code is: ', getZipCode(results[0], true))
        // console.log('📍 Coordinates: ', { lat, lng })
        setZipCode(getZipCode(results[0], false))
      })
    }

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      )
    })

  console.log(zipCode)

  return (
    <>
      <div ref={ref}>
        <input
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Where are you going?"
        />
        {/* We can use the "status" to decide whether we should display the dropdown or not */}
        {status === 'OK' && <ul>{renderSuggestions()}</ul>}
      </div>
    </>
  )
}

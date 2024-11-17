import { AddressAutoComplete } from '../components/AddressAutoComplete'
import { Suggestion } from '../hooks/useAddressSuggestions'

import { BaseFieldControl, BaseFieldControlProps } from './BaseFieldControl'

export interface AddressFormControlProps extends BaseFieldControlProps {
  onSuggestionSelected: (suggestion?: Suggestion) => void
}

export const AddressFormControl = ({
  onSuggestionSelected,
  ...baseProps
}: AddressFormControlProps) => {
  return (
    <BaseFieldControl {...baseProps}>
      {(field, disabled) => (
        <AddressAutoComplete
          onSuggestionSelected={onSuggestionSelected}
          {...field}
          disabled={disabled}
        />
      )}
    </BaseFieldControl>
  )
}

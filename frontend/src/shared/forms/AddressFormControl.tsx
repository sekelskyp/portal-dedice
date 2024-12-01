import { AddressSuggestion } from '@frontend/gql/graphql'

import { AddressAutoComplete } from '../components/AddressAutoComplete'

import { BaseFieldControl, BaseFieldControlProps } from './BaseFieldControl'

export interface AddressFormControlProps extends BaseFieldControlProps {
  onSuggestionSelected: (suggestion?: AddressSuggestion) => void
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

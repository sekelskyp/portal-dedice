import { AddressSuggestion } from '@src/gql/graphql'

import { AddressAutoComplete } from '../ui/address-auto-complete'

import { BaseFieldControl, BaseFieldControlProps } from './base-field-control'

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

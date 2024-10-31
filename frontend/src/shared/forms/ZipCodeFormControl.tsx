import { PlacesAutoComplete } from '../components/PlacesAutoComplete'

import { BaseFieldControl, BaseFieldControlProps } from './BaseFieldControl'

export interface ZipCodeControlProps extends BaseFieldControlProps {}

export const ZipCodeFormControl = (props: ZipCodeControlProps) => {
  return (
    <BaseFieldControl {...props}>
      {(field, disabled) => (
        <PlacesAutoComplete
          {...props}
          {...field}
          disabled={disabled}
          onAddressChange={(value) => field.onChange(value?.zip)}
        />
      )}
    </BaseFieldControl>
  )
}

import { AddressAutoComplete } from '../components/AddressAutoComplete'

import { BaseFieldControl, BaseFieldControlProps } from './BaseFieldControl'

export interface ZipCodeControlProps extends BaseFieldControlProps {}

export const AddressFormControl = (props: ZipCodeControlProps) => {
  return (
    <BaseFieldControl {...props}>
      {(field, disabled) => (
        <AddressAutoComplete {...props} {...field} disabled={disabled} />
      )}
    </BaseFieldControl>
  )
}

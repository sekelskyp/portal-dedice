import { useState } from 'react'

import { AssetFormData } from './AssetForm'

export const useAssetSections = (defaultValues?: AssetFormData) => {
  const [sections, setSections] = useState({
    bankAccount: defaultValues?.bankAccount ? false : true,
    company: defaultValues?.company ? false : true,
    car: defaultValues?.car ? false : true,
    valuables: defaultValues?.valuables ? false : true,
    others: defaultValues?.others ? false : true,
  })

  const handleSetSelected =
    (section: keyof typeof sections) =>
    (value: React.SetStateAction<boolean>) => {
      setSections((prev) => ({
        ...prev,
        [section]:
          typeof value === 'function'
            ? (value as (prevState: boolean) => boolean)(prev[section])
            : value,
      }))
    }

  return {
    sections,
    setSections,
    handleSetSelected,
  }
}

export default useAssetSections

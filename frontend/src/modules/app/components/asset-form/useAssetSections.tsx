import { useCallback, useMemo, useState } from 'react'

import { AssetFormData } from './AssetForm'

export const useAssetSections = (defaultValues?: AssetFormData) => {
  const initialSections = useMemo(
    () => ({
      bankAccount: !defaultValues?.bankAccount,
      company: !defaultValues?.company,
      car: !defaultValues?.car,
      valuables: !defaultValues?.valuables,
      others: !defaultValues?.others,
    }),
    [defaultValues]
  )

  const [sections, setSections] = useState(initialSections)

  const handleSetSelected = useCallback(
    (section: keyof typeof sections) =>
      (value: React.SetStateAction<boolean>) => {
        setSections((prev) => ({
          ...prev,
          [section]: typeof value === 'function' ? value(prev[section]) : value,
        }))
      },
    []
  )

  return {
    sections,
    setSections,
    handleSetSelected,
  }
}

export default useAssetSections

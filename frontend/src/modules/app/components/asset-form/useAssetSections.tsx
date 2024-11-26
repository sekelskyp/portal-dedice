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

  const [visibleSections, setVisibleSections] = useState({
    bankAccount: false,
    company: false,
    car: false,
    valuables: false,
    others: false,
  })

  const handleSetSelected =
    (section: keyof typeof sections) => (value: boolean) => {
      setSections((prev) => ({ ...prev, [section]: value }))
      setVisibleSections((prev) => ({ ...prev, [section]: !value }))
    }

  return {
    sections,
    visibleSections,
    setSections,
    handleSetSelected,
  }
}

export default useAssetSections

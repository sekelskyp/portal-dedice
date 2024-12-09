import { useState } from 'react'

import { AssetFormData } from '../components/AssetForm'

export const useAssetSections = (defaultValues?: AssetFormData) => {
  const [sections, setSections] = useState(() => ({
    bankAccount: !defaultValues?.bankAccount?.bank?.length,
    company: !defaultValues?.company?.length,
    car: !defaultValues?.car?.length,
    valuables: !defaultValues?.valuables?.description,
    others: !defaultValues?.others?.description,
  }))

  const [visibleSections, setVisibleSections] = useState(() => ({
    bankAccount: !!defaultValues?.bankAccount?.bank?.length,
    company: !!defaultValues?.company?.length,
    car: !!defaultValues?.car?.length,
    valuables: !!defaultValues?.valuables?.description,
    others: !!defaultValues?.others?.description,
  }))

  const handleSetSelected =
    (section: keyof typeof sections) => (value: boolean) => {
      setSections((prev) => ({ ...prev, [section]: value }))
      setVisibleSections((prev) => ({ ...prev, [section]: !value }))
    }

  return { sections, visibleSections, handleSetSelected }
}

export default useAssetSections

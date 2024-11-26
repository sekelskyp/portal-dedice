import { useEffect, useState } from 'react'

import { AssetFormData } from './AssetForm'

export const useAssetSections = (defaultValues?: AssetFormData) => {
  console.log('useAssetSections received defaultValues:', defaultValues)

  const [sections, setSections] = useState({
    bankAccount: !defaultValues?.bankAccount?.bank?.length,
    company: !defaultValues?.company?.length,
    car: !defaultValues?.car?.length,
    valuables: !defaultValues?.valuables?.description,
    others: !defaultValues?.others?.description,
  })

  const [visibleSections, setVisibleSections] = useState({
    bankAccount: !!defaultValues?.bankAccount?.bank?.length,
    company: !!defaultValues?.company?.length,
    car: !!defaultValues?.car?.length,
    valuables: !!defaultValues?.valuables?.description,
    others: !!defaultValues?.others?.description,
  })

  console.log('Initial section states:', { sections, visibleSections })

  useEffect(() => {
    if (defaultValues) {
      const newSections = {
        bankAccount: !defaultValues.bankAccount?.bank?.length,
        company: !defaultValues.company?.length,
        car: !defaultValues.car?.length,
        valuables: !defaultValues.valuables?.description,
        others: !defaultValues.others?.description,
      }
      setSections(newSections)
      setVisibleSections({
        bankAccount: !newSections.bankAccount,
        company: !newSections.company,
        car: !newSections.car,
        valuables: !newSections.valuables,
        others: !newSections.others,
      })
    }
  }, [defaultValues])

  const handleSetSelected =
    (section: keyof typeof sections) => (value: boolean) => {
      console.log(`Toggling section ${section}:`, value)
      setSections((prev) => ({ ...prev, [section]: value }))
      setVisibleSections((prev) => ({ ...prev, [section]: !value }))
    }

  return {
    sections,
    visibleSections,
    handleSetSelected,
  }
}

export default useAssetSections

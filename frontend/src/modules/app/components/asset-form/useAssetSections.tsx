import { useState } from 'react'

export const useAssetSections = () => {
  const [sections, setSections] = useState({
    bankAccount: false,
    company: false,
    car: false,
    valuables: false,
    others: false,
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

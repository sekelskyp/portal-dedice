import { useEffect } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

export const useAssetSection = (
  name: string,
  selected: boolean,
  defaultValue: Record<string, unknown> | unknown[],
  shouldUnregister = false
) => {
  const { setValue, control, watch } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name,
    shouldUnregister,
  })

  useEffect(() => {
    if (!selected && fields.length === 0) {
      append(defaultValue, { shouldFocus: false })
    }
  }, [selected, fields.length, append, defaultValue, name])

  const clearFields = () => {
    if (Array.isArray(defaultValue)) {
      setValue(name, [], { shouldValidate: true })
    } else {
      setValue(name, defaultValue, { shouldValidate: true })
    }
  }

  return {
    fields,
    append,
    remove,
    setValue,
    watch,
    clearFields,
  }
}

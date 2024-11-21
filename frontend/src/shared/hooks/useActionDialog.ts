import { useState } from 'react'

export function useActionDialog() {
  const [{ isOpen, selectedId }, setState] = useState<{
    isOpen: boolean
    selectedId?: string
  }>({
    isOpen: false,
    selectedId: undefined,
  })

  const toggleDialog = (state: boolean, id?: string) => {
    setState({ isOpen: state, selectedId: id })
  }

  return { isOpen, selectedId, toggleDialog }
}

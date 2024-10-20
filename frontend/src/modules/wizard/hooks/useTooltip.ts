import { useState } from 'react'

export function useTooltip() {
  const [{ isOpen }, setState] = useState<{
    isOpen: boolean
  }>({ isOpen: false })

  const openTooltip = () => {
    setState((prevState) => ({ ...prevState, isOpen: true }))
  }

  const closeTooltip = () => {
    setState((prevState) => ({ ...prevState, isOpen: false }))
  }

  const toggleTooltip = () => {
    setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }))
  }

  return { isOpen, openTooltip, closeTooltip, toggleTooltip }
}

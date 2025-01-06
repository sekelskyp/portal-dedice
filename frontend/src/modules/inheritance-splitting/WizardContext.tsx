import { createContext, ReactNode } from 'react'
import { UseFormReturn } from 'react-hook-form'

import { FormData } from './FormData'

interface WizardContextType {
  formData: FormData
  currentStep: number
  setCurrentStep: (step: number) => void
  formMethods: UseFormReturn<FormData>
}

export const WizardContext = createContext<WizardContextType | undefined>(
  undefined
)

interface WizardProviderProps {
  children: ReactNode
  value: WizardContextType
}

export const WizardProvider = ({ children, value }: WizardProviderProps) => {
  return (
    <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
  )
}

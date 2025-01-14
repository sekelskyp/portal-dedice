import { createContext, useContext } from 'react'
import { Outlet, useParams } from 'react-router-dom'

import { useProceeding, UseProceedingReturn } from '../hooks/useProceeding'

export const ProceedingLayout = () => {
  const { proceedingId } = useParams()
  const id = !proceedingId ? undefined : +proceedingId

  if (!id)
    throw new Error('Route parameter proceedingId is invalid or missing.')

  return (
    <ProceedingProvider id={id}>
      <Outlet />
    </ProceedingProvider>
  )
}

export interface IProceedingContext extends UseProceedingReturn {
  proceedingId: number
}

// eslint-disable-next-line react-refresh/only-export-components
export const ProceedingContext = createContext<IProceedingContext | null>(null)

// A proceeding context provider
export const ProceedingProvider = ({
  id,
  children,
}: {
  id: number
  children: React.ReactNode
}) => {
  const ctx = useProceeding(id)

  return (
    <ProceedingContext.Provider
      value={{
        proceedingId: id,
        ...ctx,
      }}
    >
      {children}
    </ProceedingContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProceedingContext = () => {
  const ctx = useContext(ProceedingContext)

  if (!ctx) throw new Error('ProceedingContext must be provided.')

  return ctx
}

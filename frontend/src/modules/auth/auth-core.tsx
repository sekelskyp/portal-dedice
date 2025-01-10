import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'

import { toaster } from '@frontend/shared/design-system'
import { route } from '@shared/route'

type AuthState = {
  token: string | null
  user: AuthUser | null
}

export type AuthUser = {
  addressId: string | null
  address?:
    | {
        id: string
        municipality: string
        postalCode: string
        street: string
        streetNumber: string
      }
    | null
    | undefined
  confirmed: boolean
  displayName: string
  email: string
  gender?: string | null | undefined
  id: string
  name: string
  phone?: string | null | undefined
  sendNotifications: boolean
  surname: string
  type: string
  notaryId: string | null
}

const LOCAL_STORAGE_AUTH_KEY = 'project-auth'

const initialState: AuthState = {
  token: null,
  user: null,
}

const AuthContext = createContext(
  createContextValue({
    token: initialState.token,
    user: initialState.user,
    setState: () =>
      console.error('You are using AuthContext without AuthProvider!'),
    navigate: () =>
      console.error('You are using AuthContext without AuthProvider!'),
  })
)

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}

type Props = {
  children: ReactNode
}

export function AuthProvider({ children }: Props) {
  const [state, setState] = usePersistedAuth(initialState)
  const navigate = useNavigate()

  const contextValue = useMemo(() => {
    const { token, user } = state
    return createContextValue({ token, user, setState, navigate })
  }, [state, setState, navigate])

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

function createContextValue({
  token,
  user,
  setState,
  navigate,
}: AuthState & {
  setState: (newState: AuthState) => void
  navigate: NavigateFunction
}) {
  return {
    token,
    user,
    signIn: ({ token, user }: AuthState) => setState({ token, user }),
    signOut: () => {
      setState({ token: null, user: null })
      navigate(route.home())
      toaster.create({
        title: 'Byli jste odhlášeni.',
        type: 'success',
      })
    },
  }
}

function usePersistedAuth(
  defaultState: AuthState
): [AuthState, (newState: AuthState) => void] {
  const [state, setStateRaw] = useState(() => getStorageState(defaultState))

  const setState = useCallback((newState: AuthState) => {
    setStateRaw(newState)
    setStorageState(newState)
  }, [])

  return [state, setState]
}

function getStorageState(defaultState: AuthState): AuthState {
  if (!window.localStorage) {
    return defaultState
  }

  const rawData = window.localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
  if (!rawData) {
    return defaultState
  }

  try {
    const { token, user } = JSON.parse(rawData)

    if (token && user && user.id && user.email) {
      return { token, user }
    }
  } catch {}

  return defaultState
}

function setStorageState(newState: AuthState) {
  if (!window.localStorage) {
    return
  }

  window.localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(newState))
}

import { Address } from './address'

export interface User {
  displayName: string
  email: string
  phone?: string | null
  id: string
  name: string
  surname: string
  confirmed: boolean
  type: string
  address?: Address | null
}

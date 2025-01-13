import { User } from './user'

export interface Beneficiary {
  id: string
  user?: User | null
}

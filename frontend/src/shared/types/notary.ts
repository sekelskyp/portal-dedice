import { User } from './user'

export interface Notary {
  id: string
  user?: User | null
}

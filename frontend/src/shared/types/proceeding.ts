import { Address } from '@frontend/gql/graphql'

import { Asset } from './asset'
import { Beneficiary } from './beneficiary'
import { Notary } from './notary'

export interface Proceeding {
  name: string
  deceasedDisplayName: string
  deceasedDateOfDeath: Date
  deceasedDateOfBirth: Date
  deceasedAddressId?: string | null
  deceasedAddress?: Address | null
  id: string
  state: string
  notaryId?: string | null
  procedureAssets?: Array<Asset> | null
  mainBeneficiary?: Beneficiary | null
  beneficiaries?: Array<Beneficiary> | null
  notary?: Notary | null
}

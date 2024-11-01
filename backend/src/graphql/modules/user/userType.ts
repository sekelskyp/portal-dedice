import { Field, ID, ObjectType } from 'type-graphql'

import { Beneficiary } from '../beneficiary/beneficiaryType'
import { Notary } from '../notary/notaryType'

@ObjectType()
export class User {
  @Field(() => ID)
  id!: number

  @Field()
  email!: string

  @Field()
  password!: string

  @Field()
  confirmed!: boolean

  @Field(() => [Notary])
  notaries?: Notary[]

  @Field(() => [Beneficiary])
  beneficiaries?: Beneficiary[]

  // Computed fields
  @Field()
  isNotary?: boolean

  @Field()
  isBeneficiary?: boolean
}

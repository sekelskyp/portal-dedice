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

  @Field(() => Notary, { nullable: true })
  notary?: Notary

  @Field(() => Beneficiary, { nullable: true })
  beneficiary?: Beneficiary
}

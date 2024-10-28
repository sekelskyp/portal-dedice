import { Field, ID, InputType, ObjectType } from 'type-graphql'

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

@ObjectType()
export class UserProfile {
  @Field(() => ID)
  id!: number

  @Field()
  name!: string

  @Field()
  surName!: string
}

@ObjectType()
export class ChangePassword {
  @Field(() => ID)
  id!: number

  @Field()
  email!: string
}

import { Field, InputType } from 'type-graphql'

import { GenderEnumType } from '@backend/db/schema'

@InputType()
export class ProfileInput {
  @Field()
  name!: string

  @Field()
  surname!: string

  @Field({ nullable: true })
  displayName!: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  phone?: string

  @Field(() => String, { nullable: true })
  gender?: GenderEnumType

  @Field(() => String, { nullable: true })
  addressStreet?: string

  @Field(() => String, { nullable: true })
  addressStreetNumber?: string

  @Field(() => String, { nullable: true })
  addressMunicipality?: string

  @Field(() => String, { nullable: true })
  addressPostCode?: string
}

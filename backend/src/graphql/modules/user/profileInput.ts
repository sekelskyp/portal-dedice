import { Field, InputType } from 'type-graphql'

import { GenderEnumType } from '@shared/enums'

@InputType()
export class ProfileInput {
  @Field()
  name?: string

  @Field()
  surname?: string

  @Field({ nullable: true })
  displayName?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  phone?: string

  @Field(() => String, { nullable: true })
  gender?: GenderEnumType

  @Field(() => String, { nullable: true })
  street?: string

  @Field(() => String, { nullable: true })
  streetNumber?: string

  @Field(() => String, { nullable: true })
  municipality?: string

  @Field(() => String, { nullable: true })
  postalCode?: string
}

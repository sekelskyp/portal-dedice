import { Field, InputType } from 'type-graphql'

import { GenderEnumType } from '@backend/db/schema'

@InputType()
export class CreateContactInput {
  @Field()
  name!: string

  @Field()
  surname!: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  phone?: string

  @Field({ nullable: true })
  displayName?: string

  @Field(() => String, { nullable: true })
  gender?: GenderEnumType

  @Field(() => String, { nullable: true })
  completeAddress?: string

  @Field(() => String, { nullable: true })
  postalCode?: string
}

import { Field, ID, ObjectType } from 'type-graphql'

import { GenderEnumType } from '../../../db/schema'

@ObjectType()
export class Contact {
  @Field(() => ID)
  id!: number

  @Field()
  name!: string

  @Field()
  surname!: string

  @Field(() => String, { nullable: true })
  displayName?: string | null

  @Field(() => String, { nullable: true })
  gender?: GenderEnumType | null

  @Field(() => String, { nullable: true })
  phone?: string | null

  @Field(() => String, { nullable: true })
  email?: string | null

  @Field(() => String, { nullable: true })
  completeAddress?: string | null

  @Field(() => String, { nullable: true })
  postalCode?: string | null
}

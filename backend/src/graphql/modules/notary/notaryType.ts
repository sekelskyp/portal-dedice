import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Notary {
  @Field(() => ID)
  id!: number

  @Field(() => ID, { nullable: true })
  userId?: number | null

  @Field(() => ID, { nullable: true })
  contactId?: number | null
}

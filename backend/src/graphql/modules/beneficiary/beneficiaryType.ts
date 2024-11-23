import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Beneficiary {
  @Field(() => ID)
  id!: number

  @Field(() => ID)
  userId!: number

  @Field(() => ID, { nullable: true })
  proceedingId!: number | null
}

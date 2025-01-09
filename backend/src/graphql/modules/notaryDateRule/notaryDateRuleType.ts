import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class NotaryDateRule {
  @Field(() => ID)
  id!: number

  @Field(() => ID)
  notaryId!: number

  @Field()
  startDay!: number

  @Field()
  endDay!: number

  @Field()
  startMonth!: number

  @Field()
  endMonth!: number
}

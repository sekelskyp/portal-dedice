import { Field, ID, InputType } from 'type-graphql'

@InputType()
export class NotaryDateRuleInput {
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

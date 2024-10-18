import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class NotaryDate {
  @Field(() => ID)
  id!: number

  @Field()
  notaryId!: number

  @Field()
  dateResponsible!: Date // Only stores month/day, no year
}

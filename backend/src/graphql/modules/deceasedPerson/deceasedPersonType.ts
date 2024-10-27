import { Field, ID, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class DeceasedPerson {
  @Field(() => Int)
  id!: number

  @Field()
  dateOfBirth!: Date

  @Field()
  dateOfDeath!: Date

  @Field(() => ID)
  contactId!: number
}

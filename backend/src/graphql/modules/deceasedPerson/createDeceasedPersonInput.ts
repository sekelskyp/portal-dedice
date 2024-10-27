import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class CreateDeceasedPersonInput {
  @Field(() => Int)
  contactId!: number

  @Field()
  dateOfBirth!: Date

  @Field()
  dateOfDeath!: Date
}

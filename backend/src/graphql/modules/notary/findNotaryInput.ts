import { Field, InputType } from 'type-graphql'

@InputType()
export class FindNotaryInput {
  @Field()
  addressPostCode!: string

  @Field()
  deceasedPersonDateOfDeath!: Date
}

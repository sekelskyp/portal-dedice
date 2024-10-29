import { Field, InputType } from 'type-graphql'

@InputType()
export class FindNotaryInput {
  @Field()
  postalCode!: string

  @Field()
  deceasedPersonDateOfDeath!: Date
}

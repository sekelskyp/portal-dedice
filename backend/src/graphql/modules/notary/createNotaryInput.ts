import { Field, ID, InputType } from 'type-graphql'

@InputType()
export class CreateNotaryInput {
  @Field(() => ID, { nullable: true })
  userId?: number | null

  @Field(() => String, { nullable: true })
  postalCode?: string | null
}

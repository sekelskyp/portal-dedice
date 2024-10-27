import { Field, ID, InputType } from 'type-graphql'

@InputType()
export class UpdateDeceasedPersonInput {
  @Field({ nullable: true })
  dateOfBirth?: Date

  @Field({ nullable: true })
  dateOfDeath?: Date

  @Field(() => ID, { nullable: true })
  contactId?: number
}

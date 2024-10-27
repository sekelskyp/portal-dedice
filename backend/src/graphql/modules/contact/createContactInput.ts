import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateContactInput {
  @Field()
  name!: string

  @Field()
  surname!: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  phone?: string

  @Field({ nullable: true })
  displayName?: string

  @Field({ nullable: true })
  gender?: string

  @Field()
  completeAddress!: string

  @Field()
  postalCode!: string
}

import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class AddressSuggestion {
  @Field()
  street!: string

  @Field()
  streetNumber!: string

  @Field()
  municipality!: string

  @Field()
  postalCode!: string
}

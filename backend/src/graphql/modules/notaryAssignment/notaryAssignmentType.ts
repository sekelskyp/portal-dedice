import { Field, InputType } from 'type-graphql'

// Define the AddressInput type as an input type
@InputType()
export class AddressInput {
  @Field()
  postalCode!: string
}

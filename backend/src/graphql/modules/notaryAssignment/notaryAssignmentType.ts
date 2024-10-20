import { Field, InputType, ObjectType } from 'type-graphql'

import { Contact } from '../user/contactType'

// Define the AddressInput type as an input type
@InputType()
export class AddressInput {
  @Field()
  postalCode!: string
}

@ObjectType()
export class Notary {
  @Field()
  id!: number

  @Field(() => Contact)
  contact!: Contact
}

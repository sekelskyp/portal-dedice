import { Field, InputType } from 'type-graphql'

@InputType()
export class AddressInput {
  @Field()
  street!: string

  @Field()
  streetNumber!: string

  @Field()
  municipality!: string

  @Field()
  postalCode!: string
}

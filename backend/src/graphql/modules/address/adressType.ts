import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Address {
  @Field(() => ID)
  id!: number

  @Field()
  street!: string

  @Field()
  streetNumber!: string

  @Field()
  municipality!: string

  @Field()
  postalCode!: string
}

import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Contact {
  @Field(() => ID)
  id!: number

  @Field()
  name!: string

  @Field()
  surname!: string

  @Field()
  dateOfBirth!: Date

  @Field()
  gender!: string

  @Field()
  phone!: string

  @Field()
  email!: string

  @Field()
  country!: string

  @Field()
  city!: string

  @Field()
  street!: string

  @Field()
  postalCode!: string
}

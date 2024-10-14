import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Contact {
  @Field(() => ID)
  id!: number

  @Field()
  name!: string

  @Field()
  surName!: string

  @Field()
  phone!: string

  @Field()
  email!: string

  @Field()
  gender!: string
}

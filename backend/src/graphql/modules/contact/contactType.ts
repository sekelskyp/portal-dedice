import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Contact {
  @Field(() => ID)
  id!: number

  @Field()
  name!: string

  @Field()
  surname!: string

  @Field({ nullable: true })
  displayName?: string | null

  @Field({ nullable: true })
  gender?: string | null

  @Field({ nullable: true })
  phone?: string | null

  @Field({ nullable: true })
  email?: string | null

  @Field()
  completeAddress!: string

  @Field()
  postalCode!: string
}

import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Notary {
  @Field(() => ID)
  id!: number

  @Field(() => String, { nullable: true })
  postalCode!: string | null
}

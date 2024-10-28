import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class PasswordResetToken {
  @Field(() => ID)
  id!: number

  @Field(() => ID)
  userId!: number

  @Field()
  token!: string

  @Field()
  expiresAt!: Date
}

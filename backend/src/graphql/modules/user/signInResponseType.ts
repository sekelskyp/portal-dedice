import { Field, ObjectType } from 'type-graphql'

import { User } from './userType'

@ObjectType()
export class SignInResponse {
  @Field(() => User)
  user!: User

  @Field()
  token!: string
}

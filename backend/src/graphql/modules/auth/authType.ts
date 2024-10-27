import { Field, InputType, ObjectType } from 'type-graphql'

import { User } from '@backend/graphql/modules/user/userType'

@ObjectType()
export class SignInResponse {
  @Field(() => User)
  user!: User

  @Field()
  token!: string
}

@InputType()
export class RegisterInput {
  @Field()
  login!: string

  @Field()
  password!: string
}

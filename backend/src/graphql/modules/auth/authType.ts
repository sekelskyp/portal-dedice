import { Field, InputType, ObjectType } from 'type-graphql'

import { User } from '@backend/graphql/modules/user/userType'

@ObjectType()
export class AuthInfo {
  @Field(() => User)
  user!: User

  @Field()
  token!: string
}

@InputType()
export class RegisterContactInput {
  @Field() name!: string
  @Field() surname!: string
  @Field() dateOfBirth!: Date
  @Field() gender!: string
  @Field() phone!: string
  @Field() email!: string
  @Field() country!: string
  @Field() city!: string
  @Field() street!: string
  @Field() postalCode!: string
}

@InputType()
export class RegisterInput {
  @Field()
  login!: string

  @Field()
  password!: string

  @Field()
  contact!: RegisterContactInput
}

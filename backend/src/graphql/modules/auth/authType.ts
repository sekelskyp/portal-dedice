import { Field, ObjectType } from 'type-graphql'

import { Contact } from '@backend/graphql/modules/user/contactType'
import { User } from '@backend/graphql/modules/user/userType'

@ObjectType()
export class AuthInfo {
  @Field(() => User)
  user!: User

  @Field()
  token!: string
}

@ObjectType()
export class RegisterInput {
  @Field()
  login!: string

  @Field()
  password!: string

  @Field()
  contact!: Contact
}

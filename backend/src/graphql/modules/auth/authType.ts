import { Field, ObjectType } from 'type-graphql'

import { Contact } from '@backend/graphql/modules/user/contactType'
import { User } from '@backend/graphql/modules/user/userType'

@ObjectType()
export class AuthInfo {
  @Field()
  token!: string

  @Field()
  user!: User
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

import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
  @Field(() => ID)
  id!: number

  @Field()
  email!: string

  @Field()
  password!: string
}

@ObjectType()
export class AuthInfo {
  @Field(() => User)
  user!: User

  @Field()
  token!: string
}

@ObjectType()
export class UserProfile {
  @Field(() => ID)
  id!: number

  @Field()
  name!: string

  @Field()
  surName!: string
}

@ObjectType()
export class ChangePassword {
  @Field(() => ID)
  id!: number

  @Field()
  email!: string
}

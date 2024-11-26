import { Field, ID, ObjectType } from 'type-graphql'

import { GenderEnumType, UserTypeEnumType } from '@shared/enums'

@ObjectType()
export class User {
  @Field(() => ID)
  id!: number

  @Field()
  email!: string

  @Field()
  password!: string

  @Field()
  confirmed!: boolean

  @Field(() => String)
  type!: UserTypeEnumType

  @Field(() => ID, { nullable: true })
  notaryId!: number | null

  @Field()
  sendNotifications!: boolean

  @Field()
  name!: string

  @Field()
  surname!: string

  @Field()
  displayName!: string

  @Field(() => String, { nullable: true })
  gender!: GenderEnumType | null

  @Field(() => String, { nullable: true })
  phone!: string | null

  @Field(() => ID, { nullable: true })
  addressId!: number | null
}

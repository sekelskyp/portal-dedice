import { Field, ID, ObjectType } from 'type-graphql'

import {
  genderEnum,
  GenderEnumType,
  userTypeEnum,
  UserTypeEnumType,
} from '@shared/enums'

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

  @Field(() => userTypeEnum)
  type!: UserTypeEnumType

  @Field(() => ID)
  notaryId!: number | null

  @Field()
  sendNotifications!: boolean

  @Field()
  name!: string

  @Field()
  surname!: string

  @Field()
  displayName!: string

  @Field(() => genderEnum)
  gender!: GenderEnumType | null

  @Field()
  phone!: string | null

  @Field(() => ID)
  addressId!: number | null
}

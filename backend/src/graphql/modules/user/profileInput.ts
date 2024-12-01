import { Field, InputType } from 'type-graphql'

import { GenderEnumType } from '@shared/enums'

import { AddressInput } from '../address/addressInput'

@InputType()
export class ProfileInput {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  surname?: string

  @Field({ nullable: true })
  displayName?: string

  @Field({ nullable: true })
  phone?: string

  @Field(() => String, { nullable: true })
  gender?: GenderEnumType

  @Field(() => Boolean, { nullable: true })
  sendNotifications?: boolean

  @Field(() => AddressInput, { nullable: true })
  addressInput?: AddressInput
}

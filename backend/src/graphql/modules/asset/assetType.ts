import { Field, Float, ID, ObjectType } from 'type-graphql'

import { AssetTypeEnumType } from '@shared/enums'

@ObjectType()
export class Asset {
  @Field(() => ID)
  id!: number

  @Field(() => ID)
  proceedingId!: number

  @Field(() => Float)
  value!: number

  @Field(() => String)
  name!: string

  @Field(() => String, { nullable: true })
  description?: string | null

  @Field(() => String)
  type!: AssetTypeEnumType

  @Field(() => String, { nullable: true })
  bankName?: string | null

  @Field(() => String, { nullable: true })
  carMakeName?: string | null

  @Field(() => Date, { nullable: true })
  carRegistrationDate?: Date | null

  @Field(() => String, { nullable: true })
  carType?: string | null

  @Field(() => String, { nullable: true })
  cin?: string | null
}

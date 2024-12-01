import { Field, Float, ID, InputType } from 'type-graphql'

import { AssetTypeEnumType } from '@shared/enums'

@InputType()
export class AssetInput {
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

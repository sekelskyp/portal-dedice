import { Field, Float, ID, ObjectType } from 'type-graphql'

import { AssetTypeEnumType } from '@backend/db/schema'

/**
 * AssetCopy type is a copy of Asset
 * created for the purpose of removing error from production build
 * Somehow the procedureAssets from inheritanceProcedureType.ts
 * collide in schema definition with the Asset type in assetResolver.ts
 * This is a workaround to fix the error
 *
 * Error: Schema must contain uniquely named types but contains multiple types named "Asset".
 *
 * TODO: Remove it when the error is fixed
 */
@ObjectType()
export class AssetCopy {
  @Field(() => ID)
  id!: number

  @Field(() => ID)
  inheritanceProcedureId!: number

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

import { Field, Float, ID, InputType } from 'type-graphql'

@InputType()
export class UpdateAssetInput {
  @Field(() => ID, { nullable: true })
  inheritanceProcedureId?: number

  @Field(() => Float, { nullable: true })
  value?: number

  @Field({ nullable: true })
  name?: string

  @Field(() => String, { nullable: true })
  description?: string | null

  @Field(() => String, { nullable: true })
  bankName?: string | null

  @Field(() => String, { nullable: true })
  carMakeName?: string | null
}

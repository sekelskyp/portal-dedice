import { Field, Float, InputType, Int } from 'type-graphql'

@InputType()
export class UpdateAssetInput {
  @Field(() => Int, { nullable: true })
  inheritanceProcedureId?: number

  @Field(() => Float, { nullable: true })
  value?: number

  @Field({ nullable: true })
  name?: string

  @Field(() => String, { nullable: true })
  description?: string | null
}

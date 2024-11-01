import { Field, Float, ID, InputType } from 'type-graphql'

@InputType()
export class CreateAssetInput {
  @Field(() => ID)
  inheritanceProcedureId!: number

  @Field(() => Float)
  value!: number

  @Field()
  name!: string

  @Field(() => String, { nullable: true })
  description?: string | null
}

import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Asset {
  @Field(() => ID)
  id!: number

  @Field(() => ID)
  inheritanceProcedureId!: number

  @Field()
  value!: number

  @Field()
  name!: string

  @Field(() => String, { nullable: true })
  description?: string | null
}

import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Document {
  @Field(() => ID)
  id!: number

  @Field()
  fileData!: string // base64 encoded string

  @Field()
  fileName!: string

  @Field()
  fileType!: string

  @Field(() => Date)
  createDate!: Date

  @Field(() => ID)
  proceedingId!: number
}

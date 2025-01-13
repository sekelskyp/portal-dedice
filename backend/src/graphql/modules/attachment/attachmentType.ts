import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Attachment {
  @Field(() => ID)
  id!: number

  @Field()
  uploadDate!: Date

  @Field()
  fileUuid!: string

  @Field()
  filename!: string

  @Field()
  mimetype!: string

  @Field(() => ID, { nullable: true })
  proceedingId!: number | null
}

import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Article {
  @Field(() => ID)
  id!: number

  @Field(() => String)
  title!: string

  @Field(() => Date)
  date!: Date

  @Field(() => String)
  content!: string

  @Field(() => ID, { nullable: true })
  coverImageAttachmentId!: number | null
}

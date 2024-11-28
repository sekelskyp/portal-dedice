import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class ChatMessage {
  @Field(() => ID)
  id!: number

  @Field(() => ID)
  chatId!: number

  @Field(() => ID)
  userId!: number

  @Field(() => String)
  body!: string

  @Field(() => Date)
  createdAt!: Date

  @Field(() => String, { nullable: true })
  displayName?: string
}

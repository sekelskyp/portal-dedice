import { Field, ID, ObjectType } from 'type-graphql'

import { ChatMessage } from './chatMessageType'

@ObjectType()
export class Chat {
  @Field(() => ID)
  id!: number

  @Field(() => ID)
  proceedingId!: number

  @Field(() => [ChatMessage], { nullable: true })
  chatMessages?: ChatMessage[]
}

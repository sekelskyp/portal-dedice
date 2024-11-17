import { Field, ID, ObjectType } from 'type-graphql'

import { ChatMessage } from './chatMessage'

@ObjectType()
export class Chat {
  @Field(() => ID)
  id!: number

  @Field(() => ID)
  inheritanceProcedureId!: number

  @Field(() => [ChatMessage], { nullable: true })
  chatMessages?: ChatMessage[]
}

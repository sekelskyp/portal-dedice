import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  Subscription,
} from 'type-graphql'

import { CustomContext } from '@backend/types/types'

import { ChatMessage } from './chatMessage'
import { Chat } from './chatType'

const NEW_CHAT_MESSAGE = 'NEW_CHAT_MESSAGE'

@Resolver(() => Chat)
export class ChatResolver {
  @Query(() => Chat)
  async chat(
    @Arg('id', () => Int) id: number,
    @Ctx() { chatRepository }: CustomContext
  ): Promise<Chat | null> {
    return await chatRepository.getChatById(id)
  }

  @Query(() => Chat)
  async chatByInheritanceProcedureId(
    @Arg('inheritanceProcedureId', () => Int) inheritanceProcedureId: number,
    @Ctx() { chatRepository }: CustomContext
  ): Promise<Chat | null> {
    return await chatRepository.getChatByInheritanceProcedureId(
      inheritanceProcedureId
    )
  }

  @FieldResolver(() => [ChatMessage])
  async chatMessages(
    @Root() chat: Chat,
    @Ctx() { chatMessageRepository }: CustomContext
  ): Promise<ChatMessage[]> {
    return await chatMessageRepository.getChatMessagesByChatId(chat.id)
  }

  @Mutation(() => ChatMessage)
  async addChatMessage(
    @Arg('chatId', () => Int) chatId: number,
    @Arg('userId', () => Int) userId: number,
    @Arg('body', () => String) body: string,
    @Ctx() { chatMessageRepository, pubSub }: CustomContext
  ): Promise<ChatMessage> {
    const data = { chatId, userId, body, createdAt: new Date() }
    const { id } = await chatMessageRepository.addChatMessage(data)
    const chatMessage = await chatMessageRepository.getChatMessageById(id)

    // Publish the event
    await pubSub.publish(NEW_CHAT_MESSAGE, { newChatMessage: chatMessage })

    return chatMessage
  }

  @Subscription(() => ChatMessage, {
    topics: NEW_CHAT_MESSAGE,
    filter: ({ payload, args }) => {
      return payload.newChatMessage.chatId === args.chatId
    },
  })
  newChatMessage(
    @Arg('chatId', () => Int) chatId: number,
    @Root() payload: { newChatMessage: ChatMessage }
  ): ChatMessage {
    return payload.newChatMessage
  }
}

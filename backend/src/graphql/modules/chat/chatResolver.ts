import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql'

import { CustomContext } from '@backend/types/types'

import { ChatMessage } from './chatMessage'
import { Chat } from './chatType'

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
    @Ctx() { chatMessageRepository }: CustomContext
  ): Promise<ChatMessage> {
    const data = { chatId, userId, body, createdAt: new Date() }
    const { id } = await chatMessageRepository.addChatMessage(data)
    const chatMessage = await chatMessageRepository.getChatMessageById(id)
    return chatMessage
  }
}

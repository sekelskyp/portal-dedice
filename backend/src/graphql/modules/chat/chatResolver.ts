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
    @Arg('procedureId', () => Int) procedureId: number,
    @Arg('userId', () => Int) userId: number,
    @Arg('body', () => String) body: string,
    @Ctx() context: CustomContext
  ): Promise<ChatMessage> {
    const { chatMessageRepository, pubSub, chatRepository } = context

    // Get the chatId from the procedureId
    const chat =
      await chatRepository.getChatByInheritanceProcedureId(procedureId)
    if (!chat) {
      throw new Error('Chat not found for the given procedureId')
    }
    const chatId = chat.id

    const data = { chatId, userId, body, createdAt: new Date() }
    const { id } = await chatMessageRepository.addChatMessage(data)
    const chatMessage = await chatMessageRepository.getChatMessageById(id)

    // Publish the event
    await pubSub.publish(NEW_CHAT_MESSAGE, {
      newChatMessage: chatMessage,
      procedureId,
    })

    return chatMessage
  }

  @Subscription(() => ChatMessage, {
    topics: NEW_CHAT_MESSAGE,
    filter: ({ payload, args }) => {
      console.log('payload', payload)
      return payload.procedureId === args.procedureId
    },
  })
  newChatMessage(
    @Arg('procedureId', () => Int) procedureId: number,
    @Root() payload: { newChatMessage: ChatMessage }
  ): ChatMessage {
    console.log('payload.newMessage', payload.newChatMessage)
    return payload.newChatMessage
  }
}

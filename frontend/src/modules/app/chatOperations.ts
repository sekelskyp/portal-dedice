import { gql } from '@frontend/gql'

export const GET_CHAT_QUERY = gql(/* GraphQL */ `
  query getChat($inheritanceProcedureId: Int!) {
    chatByInheritanceProcedureId(
      inheritanceProcedureId: $inheritanceProcedureId
    ) {
      chatMessages {
        body
        chatId
        createdAt
        id
        userId
      }
    }
  }
`)

export const SUBSCRIPTION = gql(/* GraphQL */ `
  subscription newChatMessage($chatId: Int!) {
    newChatMessage(chatId: $chatId) {
      chatId
      body
      userId
      createdAt
      id
    }
  }
`)
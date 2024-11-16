import { gql } from '@frontend/gql'

export const ADD_MESSAGE_MUTATION = gql(/* GraphQL */ `
  mutation addMessage($body: String!, $procedureId: Int!, $userId: Int!) {
    addChatMessage(body: $body, procedureId: $procedureId, userId: $userId) {
      chatId
      body
      userId
    }
  }
`)

export const GET_MESSAGES_QUERY = gql(/* GraphQL */ `
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

export const MESSAGE_SUBSCRIPTION = gql(/* GraphQL */ `
  subscription newChatMessage($procedureId: Int!) {
    newChatMessage(procedureId: $procedureId) {
      chatId
      body
      userId
      createdAt
      id
    }
  }
`)

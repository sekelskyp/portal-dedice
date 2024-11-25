import { gql } from '@frontend/gql'

//TODO: fix query and components

export const ADD_MESSAGE_MUTATION = gql(/* GraphQL */ `
  mutation addMessage($body: String!, $proceedingId: Int!, $userId: Int!) {
    addChatMessage(body: $body, proceedingId: $proceedingId, userId: $userId) {
      chatId
      body
      userId
    }
  }
`)

//TODO: fix query and components

export const GET_MESSAGES_QUERY = gql(/* GraphQL */ `
  query getChat($proceedingId: Int!) {
    chatByProceedingId(proceedingId: $proceedingId) {
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

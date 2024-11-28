import { gql } from '@frontend/gql'

export const ADD_MESSAGE = gql(/* GraphQL */ `
  mutation addMessage($body: String!, $proceedingId: Int!, $userId: Int!) {
    addChatMessage(body: $body, proceedingId: $proceedingId, userId: $userId) {
      chatId
      body
      userId
    }
  }
`)

export const GET_MESSAGES = gql(/* GraphQL */ `
  query ChatByProceedingId($proceedingId: Int!) {
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

export const GET_CHAT_HEADER = gql(/* GraphQL */ `
  query GetChatHeader($getProceedingByIdId: Int!) {
    getProceedingById(id: $getProceedingByIdId) {
      beneficiaries {
        user {
          displayName
          id
        }
      }
      notary {
        user {
          displayName
          id
        }
      }
    }
  }
`)

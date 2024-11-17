import { useQuery } from '@apollo/client'
import { Box, Flex, Text } from '@chakra-ui/react'
import gql from 'graphql-tag'

import { Beneficiary } from '@frontend/gql/graphql'
import { Avatar } from '@frontend/shared/design-system'

interface MessageProps {
  userId: number
  body: string
  createdAt: string
  currentUserId?: number
  procedureId: number
  notaryDisplayName: string
  isNotary: boolean
  isMobile: boolean
}

const GET_BENEFICIARIES = gql(/* GraphQL */ `
  query GetBeneficiariesByProcedureId($procedureId: Int!) {
    getBeneficiariesByProcedureId(procedureId: $procedureId) {
      contactId
      userId
    }
  }
`)

const GET_DISPLAYNAME = gql(/* GraphQL */ `
  query GetContactById($id: Int!) {
    getContactById(id: $id) {
      displayName
    }
  }
`)

export function Message({
  userId,
  procedureId,
  body,
  createdAt,
  currentUserId,
  isNotary,
  notaryDisplayName,
  isMobile,
}: MessageProps) {
  const isCurrentUser = userId === currentUserId

  const beneficiaries =
    useQuery(GET_BENEFICIARIES, { variables: { procedureId: procedureId } })
      .data?.getBeneficiariesByProcedureId ?? []

  const userContactId = beneficiaries.find(
    (beneficiary: Beneficiary) => beneficiary.userId === userId.toString()
  )?.contactId

  const userDisplayName =
    useQuery(GET_DISPLAYNAME, {
      variables: { id: +userContactId! },
    }).data?.getContactById?.displayName ?? `User ${userId}`

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr)
    const today = new Date()
    const isToday = date.toDateString() === today.toDateString()

    if (isToday) {
      // Show only time for today's messages
      return new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(date)
    }

    // Show full date and time for older messages
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date)
  }

  return (
    <>
      <Flex
        justifyContent="flex-start"
        gap={2}
        alignItems="flex-end"
        px={2}
        width="100%"
      >
        {(isMobile || !isCurrentUser) && (
          <Avatar
            name={isNotary ? notaryDisplayName : userDisplayName}
            bg={isCurrentUser ? 'blue.100' : 'gray.100'}
            size={isMobile ? 'sm' : 'md'}
          />
        )}
        <Box
          bg={isCurrentUser ? 'blue.100' : 'gray.100'}
          p={4}
          borderRadius="2xl"
          maxW={isMobile ? '75%' : '45%'}
          ml={isMobile ? 0 : isCurrentUser ? 'auto' : '0'}
          position="relative"
          border="1px solid"
          borderColor={isCurrentUser ? 'blue.200' : 'gray.200'}
          boxShadow="md"
        >
          <Text fontSize={isMobile ? 'sm' : 'lg'}>
            {isNotary ? notaryDisplayName : userDisplayName}
          </Text>
          <Text color="gray.600" wordBreak="break-word">
            {body}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {formatDateTime(createdAt)}
          </Text>
        </Box>
        {!isMobile && isCurrentUser && (
          <Avatar
            name={isNotary ? notaryDisplayName : userDisplayName}
            bg={'blue.100'}
            size="md"
          />
        )}
      </Flex>
    </>
  )
}

import { useQuery } from '@apollo/client/react/hooks/useQuery'
import { Box, Heading, Text } from '@chakra-ui/react'

import { GET_CHAT_HEADER } from '../utils/chatOperations.ts'

interface ChatHeaderProps {
  proceedingId: number
  isHistory: boolean
}

export default function ChatHeader({
  proceedingId,
  isHistory,
}: ChatHeaderProps) {
  const { data, loading, error } = useQuery(GET_CHAT_HEADER, {
    variables: { getProceedingByIdId: proceedingId },
  })

  const proceedingName = data?.getProceedingById?.name

  const beneficiaryNames =
    data?.getProceedingById?.beneficiaries?.map(
      (beneficiary) => beneficiary.user?.displayName
    ) ?? []

  const notaryName = data?.getProceedingById?.notary?.user?.displayName
  const allNames = [...beneficiaryNames, notaryName].join(', ')

  return !isHistory ? (
    <Box width="full">
      {error ? (
        <Heading>Chat</Heading>
      ) : loading ? (
        <Text>Načítání...</Text>
      ) : (
        <>
          <Heading size={['md', 'lg', 'xl']}>
            Chat s uživateli: {allNames}{' '}
          </Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }} pt={2}>
            Řízení: {proceedingName}
          </Text>
        </>
      )}
    </Box>
  ) : (
    <Box width="full">
      {error ? (
        <Heading>Chatová historie</Heading>
      ) : loading ? (
        <Text>Načítání historie...</Text>
      ) : (
        <>
          <Heading as="h2">Chatová historie s uživateli: {allNames} </Heading>
          <Text fontSize="lg">Řízení: {proceedingName}</Text>
        </>
      )}
    </Box>
  )
}

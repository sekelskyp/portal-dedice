import { useQuery } from '@apollo/client/react/hooks/useQuery'
import { Box, Heading, Text } from '@chakra-ui/react'

import { GET_CHAT_HEADER } from '../utils/chatOperations.ts'

interface ChatHeaderProps {
  proceedingId: number
}

export default function ChatHeader({ proceedingId }: ChatHeaderProps) {
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

  return (
    <Box width="full">
      {error ? (
        <Heading>Chat</Heading>
      ) : loading ? (
        <Text>Načítání...</Text>
      ) : (
        <>
          <Heading as="h2">Chat s uživateli: {allNames} </Heading>
          <Text fontSize="lg">Řízení: {proceedingName}</Text>
        </>
      )}
    </Box>
  )
}

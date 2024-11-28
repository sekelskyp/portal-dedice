import { useQuery } from '@apollo/client/react/hooks/useQuery'
import { Box, Heading } from '@chakra-ui/react'

import { GET_CHAT_HEADER } from '../utils/chatOperations.ts'

interface ChatHeaderProps {
  proceedingId: number
}

export default function ChatHeader({ proceedingId }: ChatHeaderProps) {
  const { data, loading, error } = useQuery(GET_CHAT_HEADER, {
    variables: { getProceedingByIdId: proceedingId },
  })

  const beneficiaryNames =
    data?.getProceedingById?.beneficiaries?.map(
      (beneficiary) => beneficiary.user?.displayName
    ) ?? []

  const notaryName = data?.getProceedingById?.notary?.user?.displayName
  const allNames = [...beneficiaryNames, notaryName].join(', ')

  if (loading) return <p>Loading ...</p>
  if (error) return `Error! ${error}`

  return (
    <Box>
      <Heading>Chat s uživateli: {allNames}</Heading>
    </Box>
  )
}

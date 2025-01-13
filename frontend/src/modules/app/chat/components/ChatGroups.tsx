import { type ReactNode, useEffect } from 'react'
import { Tabs, Text } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '@frontend/modules/auth/auth-core'
import { Alert } from '@frontend/shared/design-system'

import { useGetBeneficiaryGroups } from '../hooks/useGetBeneficiaryGroups'
import { useGetNotaryGroups } from '../hooks/useGetNotaryGroups'

interface ChatGroup {
  id: string
  name: string
}

interface ChatGroupProps {
  children: ReactNode
}

export default function ChatGroups({ children }: ChatGroupProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const user = useAuth()
  const userId = +user.user?.id!
  const isNotary = user.user?.type === 'Notary'

  const beneficiaryGroups = useGetBeneficiaryGroups({
    userId: userId,
  })

  const notaryGroups = useGetNotaryGroups({ userId: userId })

  const data = {
    groups: isNotary ? notaryGroups.data : beneficiaryGroups.data,
    loading: isNotary ? notaryGroups.loading : beneficiaryGroups.loading,
    error: isNotary ? notaryGroups.error : beneficiaryGroups.error,
  }

  const chatGroups: ChatGroup[] = data.groups.map((group) => ({
    id: group.id,
    name: group.name,
  }))

  useEffect(() => {
    if (
      location.pathname === '/portal/chat/' &&
      chatGroups.length > 0 &&
      !data.loading
    ) {
      const firstChat = chatGroups[0]
      navigate(`/portal/chat/${firstChat.id}/`)
    }
  }, [chatGroups, navigate, location.pathname, data.loading])

  const currentGroupId =
    location.pathname.split('/')[3] ||
    (chatGroups.length > 0 ? chatGroups[0].id : undefined)

  if (chatGroups.length === 0) {
    return (
      <Alert status="info" title="Momentálně nejste v žádném aktivním chatu." />
    )
  }

  return (
    <Tabs.Root
      value={currentGroupId}
      onValueChange={(value) => {
        navigate(`/portal/chat/${value.value}/`)
      }}
    >
      <Tabs.List>
        {chatGroups.map((group, index) => (
          <Tabs.Trigger key={group.id} value={group.id}>
            <Text display={{ base: 'block', md: 'none' }}>
              {group.name.split('_').pop() || `Rizeni ${index}`}
            </Text>
            <Text display={{ base: 'none', md: 'block' }}>{group.name}</Text>
          </Tabs.Trigger>
        ))}
        <Tabs.Indicator />
      </Tabs.List>
      {chatGroups.map((group) => (
        <Tabs.Content key={group.id} value={group.id} display="grid" gap={8}>
          {children}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}

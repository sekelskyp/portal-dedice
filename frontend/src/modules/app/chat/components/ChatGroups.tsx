import { Tabs } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@frontend/modules/auth/auth-core'

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

  return (
    <Tabs.Root
      defaultValue={chatGroups[0]?.id}
      onValueChange={(value) => {
        console.log(value)
        navigate(`/portal/chat/${value.value}/`)
      }}
    >
      <Tabs.List>
        {chatGroups.map((group) => (
          <Tabs.Trigger key={group.id} value={group.id}>
            {group.name}
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

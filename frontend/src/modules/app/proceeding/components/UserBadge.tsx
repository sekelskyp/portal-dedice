import { HStack, Stack, Text } from '@chakra-ui/react'
import { Trash2Icon } from 'lucide-react'

import {
  Alert,
  Button,
  Skeleton,
  SkeletonCircle,
} from '@frontend/shared/design-system'
import {} from '@frontend/shared/design-system/atoms/chakra'

import { UserAvatar } from '../../components/UserAvatar'

interface User {
  name: string
  surname: string
  email: string
  displayName: string
}

interface UserBadgeProps {
  user?: User | null
  loading?: boolean
  issueText?: string
  removable?: boolean
  onRemoveClick?: () => void
}

export function UserBadge(props: UserBadgeProps) {
  const { user, loading, removable: editable, issueText, onRemoveClick } = props

  if (!user && loading) return UserBadgeSkeleton()

  if (user) return UserBadgeFilled({ user, editable, onRemoveClick })

  return UserBadgeIssue({ issueText: issueText ?? '' })
}

const UserBadgeFilled = ({
  user,
  editable,
  onRemoveClick,
}: {
  user: User
  editable?: boolean
  onRemoveClick?: () => void
}) => (
  <HStack
    gap={3}
    justifyContent={{ base: 'center', lg: 'left' }}
    borderRadius={6}
    px={3}
    py={2}
    bg={editable ? 'bg.emphasized/75' : 'none'}
    border={editable ? '1px solid' : 'none'}
    borderColor="bg.emphasized"
    boxShadow={editable ? 'card' : 'none'}
    _hover={{
      bg: editable ? 'bg.emphasized' : 'none',
    }}
  >
    <UserAvatar {...user} />
    <Stack gap="0" h={10}>
      <Text fontSize="md" mt={-0.5} fontWeight="bold">
        {!!user.displayName.trim()
          ? user.displayName
          : `${user.name} ${user.surname}`}
      </Text>
      <Text fontSize="sm" mt={-0.5} color="fg.muted">
        {user.email}
      </Text>
    </Stack>
    {editable && (
      <Stack flexGrow={1} alignItems="end">
        <Button
          size="xs"
          variant="ghost"
          colorPalette="red"
          onClick={onRemoveClick}
          title="Odebrat"
        >
          <Trash2Icon />
        </Button>
      </Stack>
    )}
  </HStack>
)

const UserBadgeSkeleton = () => (
  <HStack gap={4} p={2} justifyContent={{ base: 'center', lg: 'left' }}>
    <SkeletonCircle size={{ base: '8', sm: '12' }} />
    <Stack gap="2" w="full">
      <Skeleton h={5} w="2/3" />
      <Skeleton h={4} w="3/4" />
    </Stack>
  </HStack>
)

const UserBadgeIssue = ({ issueText }: { issueText: string }) => (
  <Alert status="warning" title={issueText} h={14} />
)

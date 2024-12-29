import { SetStateAction } from 'react'
import { IconButton, Stack } from '@chakra-ui/react'
import { FaUserCheck, FaUserMinus } from 'react-icons/fa'

import { UserItem } from './UserTable'

export function UserActionButton({
  isActive,
  user,
  setSelectedUser,
  toggleDialog,
}: {
  isActive: boolean
  user: UserItem
  setSelectedUser: (value: SetStateAction<UserItem | null>) => void
  toggleDialog: (state: boolean, id?: string) => void
}) {
  return (
    <Stack direction="row" alignItems="center">
      <IconButton
        borderRadius="md"
        bg={isActive ? 'red.600' : 'green.600'}
        _hover={{ bg: isActive ? 'red.700' : 'green.700' }}
        onClick={() => {
          setSelectedUser(user)
          toggleDialog(true, user.id)
        }}
        size="md"
        p={4}
        w={32}
      >
        {isActive ? <FaUserMinus /> : <FaUserCheck />}
        {isActive ? 'Deaktivovat' : 'Aktivovat'}
      </IconButton>
    </Stack>
  )
}

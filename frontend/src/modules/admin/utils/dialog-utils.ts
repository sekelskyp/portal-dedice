import { UserItem } from '../components/UserTable'

import { USER_TYPE_MAPPING } from './user-mapping'

export const prepareDialogUserInfo = (user: UserItem) => {
  const userRole = user
    ? USER_TYPE_MAPPING[user.type as keyof typeof USER_TYPE_MAPPING]
    : ''
  const dialogTitle = user
    ? `${user.confirmed ? 'Deaktivace' : 'Aktivace'} uživatele`
    : ''
  const dialogText = user
    ? `Opravdu chcete ${
        user.confirmed ? 'deaktivovat' : 'aktivovat'
      } uživatele ${user.displayName} (${userRole}) z adresy ${user.address}?`
    : ''

  return { dialogTitle, dialogText }
}

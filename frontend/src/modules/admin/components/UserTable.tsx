import { Stack, Table } from '@chakra-ui/react'
import { TableBody } from '@components/table/table-body'
import { TableFooter } from '@components/table/table-footer'
import { TableHeader } from '@components/table/table-header'
import { TableSearchBar } from '@components/table/table-search-bar'
import { TableWrapper } from '@components/table/table-wrapper'
import { ActionDialog } from '@components/ui/action-dialog'

import { useUsersTable } from '../hooks/useUsersTable'
import { prepareDialogUserInfo } from '../utils/dialog-utils'

export type UserItem = {
  id: string
  displayName: string
  address: string
  type: string
  confirmed: boolean
  notaryId: string
}

export function UserTable({ data }: { data: UserItem[] }) {
  const { table, setGlobalFilter, dialog } = useUsersTable({ data })
  const { dialogTitle, dialogText } = dialog.selectedUser
    ? prepareDialogUserInfo(dialog.selectedUser)
    : { dialogTitle: '', dialogText: '' }

  return (
    <>
      <ActionDialog
        title={dialogTitle}
        text={dialogText}
        onConfirm={dialog.handleUserStatusChange}
        isOpen={dialog.isOpen}
        toggle={dialog.toggleDialog}
        selectedId={dialog.selectedId}
      />
      <Stack gap={4}>
        <TableSearchBar table={table} setGlobalFilter={setGlobalFilter} />
        <TableWrapper>
          <Table.Root size="sm">
            <TableHeader table={table} />
            <TableBody table={table} />
          </Table.Root>
        </TableWrapper>
        <TableFooter table={table} />
      </Stack>
    </>
  )
}

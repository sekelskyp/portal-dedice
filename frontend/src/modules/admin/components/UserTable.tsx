import { Stack, Table } from '@chakra-ui/react'

import { TableBody } from '@frontend/shared/components/table/TableBody'
import { TableFooter } from '@frontend/shared/components/table/TableFooter'
import { TableHeader } from '@frontend/shared/components/table/TableHeader'
import { TableSearchBar } from '@frontend/shared/components/table/TableSearchBar'
import { TableWrapper } from '@frontend/shared/components/table/TableWrapper'

import { useUsersTable } from '../hooks/useUsersTable'

export type UserItem = {
  id: string
  displayName: string
  address: string
  type: string
}

export function UserTable({ data }: { data: UserItem[] }) {
  const { table, setGlobalFilter } = useUsersTable({ data })

  return (
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
  )
}

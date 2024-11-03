import { Stack, Table } from '@chakra-ui/react'

import { useProceedingsTable } from '../../hooks/useProceedingsTable'

import { ProceedingsTableBody } from './ProceedingsTableBody'
import { ProceedingsTableFooter } from './ProceedingsTableFooter'
import { ProceedingsTableHeader } from './ProceedingsTableHeader'
import { ProceedingsTableSearchBar } from './ProceedingsTableSearchBar'

export type ProceedingsItem = {
  id: string
  name: string
  startDate: string
  state: string
}

export function ProceedingsTable({ data }: { data: ProceedingsItem[] }) {
  const { table, setGlobalFilter } = useProceedingsTable({ data })

  return (
    <Stack gap={4}>
      <ProceedingsTableSearchBar
        table={table}
        setGlobalFilter={setGlobalFilter}
      />
      <Table.Root size="sm">
        <ProceedingsTableHeader table={table} />
        <ProceedingsTableBody table={table} />
      </Table.Root>
      <ProceedingsTableFooter table={table} />
    </Stack>
  )
}

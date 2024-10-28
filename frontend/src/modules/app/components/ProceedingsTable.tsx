import { Table, TableContainer } from '@chakra-ui/react'

import { useProceedingsTable } from '../hooks/useProceedingsTable'

import { ProceedingsTableBody } from './ProceedingsTableBody'
import { ProceedingsTableFooter } from './ProceedingsTableFooter'
import { ProceedingsTableHeader } from './ProceedingsTableHeader'
import { ProceedingsTableSearchBar } from './ProceedingsTableSearchBar'

export type ProceedingsItem = {
  id: number
  date: string
  status: string
}

export function ProceedingsTable({ data }: { data: ProceedingsItem[] }) {
  const { table, setGlobalFilter } = useProceedingsTable({ data })

  return (
    <TableContainer
      p={5}
      mx={5}
      mb={5}
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="xl"
      width="80%"
      textAlign="center"
    >
      <ProceedingsTableSearchBar
        table={table}
        setGlobalFilter={setGlobalFilter}
      />
      <Table size="sm">
        <ProceedingsTableHeader table={table} />
        <ProceedingsTableBody table={table} />
      </Table>
      <ProceedingsTableFooter table={table} />
    </TableContainer>
  )
}

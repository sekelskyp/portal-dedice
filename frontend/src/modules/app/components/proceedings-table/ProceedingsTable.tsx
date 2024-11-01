import { Box, Table } from '@chakra-ui/react'

import { useProceedingsTable } from '../../hooks/useProceedingsTable'

import { ProceedingsTableBody } from './ProceedingsTableBody'
import { ProceedingsTableFooter } from './ProceedingsTableFooter'
import { ProceedingsTableHeader } from './ProceedingsTableHeader'
import { ProceedingsTableSearchBar } from './ProceedingsTableSearchBar'

export type ProceedingsItem = {
  id: number
  startDate: string
  state: string
}

export function ProceedingsTable({ data }: { data: ProceedingsItem[] }) {
  const { table, setGlobalFilter } = useProceedingsTable({ data })

  return (
    <Box
      p={5}
      mx={5}
      mb={5}
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="xl"
      width="95%"
      textAlign="center"
      bg="white"
      overflowX="auto"
    >
      <ProceedingsTableSearchBar
        table={table}
        setGlobalFilter={setGlobalFilter}
      />
      <Table.Root size="sm">
        <ProceedingsTableHeader table={table} />
        <ProceedingsTableBody table={table} />
      </Table.Root>
      <ProceedingsTableFooter table={table} />
    </Box>
  )
}

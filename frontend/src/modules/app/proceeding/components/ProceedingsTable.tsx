import { Stack, Table } from '@chakra-ui/react'
import { TableBody } from '@components/table/table-body'
import { TableFooter } from '@components/table/table-footer'
import { TableHeader } from '@components/table/table-header'
import { TableSearchBar } from '@components/table/table-search-bar'
import { TableWrapper } from '@components/table/table-wrapper'
import { ActionDialog } from '@components/ui/action-dialog'

import { useProceedingsTable } from '../hooks/useProceedingsTable'

export type ProceedingsItem = {
  id: string
  name: string
  startDate: string
  state: string
  deceasedDisplayName: string
}

export function ProceedingsTable({ data }: { data: ProceedingsItem[] }) {
  const { table, dialog, setGlobalFilter } = useProceedingsTable({ data })

  return (
    <>
      <ActionDialog
        title="Smazání řízení"
        text="Opravdu chcete toto řízení smazat?"
        onConfirm={dialog.handleProcedureDelete}
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

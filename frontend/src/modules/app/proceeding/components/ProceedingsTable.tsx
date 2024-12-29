import { Stack, Table } from '@chakra-ui/react'

import { ActionDialog } from '@frontend/shared/components/ActionDialog'
import { TableBody } from '@frontend/shared/components/table/TableBody'
import { TableFooter } from '@frontend/shared/components/table/TableFooter'
import { TableHeader } from '@frontend/shared/components/table/TableHeader'
import { TableSearchBar } from '@frontend/shared/components/table/TableSearchBar'
import { TableWrapper } from '@frontend/shared/components/table/TableWrapper'

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

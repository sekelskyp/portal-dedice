import { Grid, Stack, Table } from '@chakra-ui/react'

import { ActionDialog } from '@frontend/shared/components/ActionDialog'

import { useProceedingsTable } from '../hooks/useProceedingsTable'

import { ProceedingsTableBody } from './ProceedingsTableBody'
import { ProceedingsTableFooter } from './ProceedingsTableFooter'
import { ProceedingsTableHeader } from './ProceedingsTableHeader'
import { ProceedingsTableSearchBar } from './ProceedingsTableSearchBar'

//TODO: fix new proceedings structure (contact)

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
        <ProceedingsTableSearchBar
          table={table}
          setGlobalFilter={setGlobalFilter}
        />
        <TableWrapper>
          <Table.Root size="sm">
            <ProceedingsTableHeader table={table} />
            <ProceedingsTableBody table={table} />
          </Table.Root>
        </TableWrapper>
        <ProceedingsTableFooter table={table} />
      </Stack>
    </>
  )
}

/** Makes Table scrollable when overflows parent. */
const TableWrapper = ({ children }: { children: React.ReactNode }) => (
  <Grid
    overflowX="auto"
    maxW="100%"
    gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
  >
    {children}
  </Grid>
)

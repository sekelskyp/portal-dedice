import { Table } from '@chakra-ui/react'
import { flexRender, Table as ReactTable } from '@tanstack/react-table'

import { ProceedingsItem } from './ProceedingsTable'

export function ProceedingsTableBody({
  table,
}: {
  table: ReactTable<ProceedingsItem>
}) {
  return (
    <Table.Body>
      {table.getRowModel().rows.map((row) => {
        return (
          <Table.Row key={row.id}>
            {row.getVisibleCells().map((cell) => {
              return (
                <Table.Cell key={cell.id} textAlign="center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              )
            })}
          </Table.Row>
        )
      })}
    </Table.Body>
  )
}

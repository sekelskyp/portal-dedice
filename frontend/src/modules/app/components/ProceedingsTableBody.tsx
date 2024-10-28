import { Tbody, Td, Tr } from '@chakra-ui/react'
import { flexRender, Table } from '@tanstack/react-table'

import { ProceedingsItem } from './ProceedingsTable'

export function ProceedingsTableBody({
  table,
}: {
  table: Table<ProceedingsItem>
}) {
  return (
    <Tbody>
      {table.getRowModel().rows.map((row) => {
        return (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              return (
                <Td key={cell.id} textAlign="center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              )
            })}
          </Tr>
        )
      })}
    </Tbody>
  )
}

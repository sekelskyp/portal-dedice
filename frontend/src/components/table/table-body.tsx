import { Table } from '@chakra-ui/react'
import { flexRender, Table as ReactTable } from '@tanstack/react-table'

export function TableBody<TData>({ table }: { table: ReactTable<TData> }) {
  return (
    <Table.Body whiteSpace="nowrap">
      {table.getRowModel().rows.map((row) => {
        return (
          <Table.Row key={row.id} bg="inherit">
            {row.getVisibleCells().map((cell) => {
              return (
                <Table.Cell
                  key={cell.id}
                  style={{ width: cell.column.getSize() }}
                >
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

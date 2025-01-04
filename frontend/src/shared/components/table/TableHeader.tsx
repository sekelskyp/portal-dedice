import { Heading, Stack, Table } from '@chakra-ui/react'
import { flexRender, Table as ReactTable } from '@tanstack/react-table'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'

import { TableFilter } from './TableFilter'

export function TableHeader<TData>({ table }: { table: ReactTable<TData> }) {
  return (
    <Table.Header textAlign="center" whiteSpace="nowrap">
      {table.getHeaderGroups().map((headerGroup) => (
        <Table.Row key={headerGroup.id} bg="inherit">
          {headerGroup.headers.map((header) => {
            return (
              <Table.ColumnHeader
                key={header.id}
                colSpan={header.colSpan}
                style={{ textTransform: 'none' }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <Heading size={{ base: 'sm', sm: 'md', md: 'lg' }}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Heading>
                  {header.column.getIsSorted() === 'asc' ? (
                    <HiChevronUp size="20" />
                  ) : header.column.getIsSorted() === 'desc' ? (
                    <HiChevronDown size="20" />
                  ) : null}
                </Stack>
                {header.column.getCanFilter() ? (
                  <TableFilter column={header.column} />
                ) : null}
              </Table.ColumnHeader>
            )
          })}
        </Table.Row>
      ))}
    </Table.Header>
  )
}

import { Heading, Stack, Table } from '@chakra-ui/react'
import { flexRender, Table as ReactTable } from '@tanstack/react-table'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'

import { ProceedingsItem } from './ProceedingsTable'

export function ProceedingsTableHeader({
  table,
}: {
  table: ReactTable<ProceedingsItem>
}) {
  return (
    <Table.Header textAlign="center">
      {table.getHeaderGroups().map((headerGroup) => (
        <Table.Row key={headerGroup.id} bg="white">
          {headerGroup.headers.map((header) => {
            return (
              <Table.ColumnHeader
                key={header.id}
                colSpan={header.colSpan}
                style={{ textTransform: 'none' }}
              >
                <Stack
                  direction="row"
                  textAlign="center"
                  justifyContent="center"
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
                    <HiChevronDown fontSize="24px" />
                  ) : header.column.getIsSorted() === 'desc' ? (
                    <HiChevronUp fontSize="24px" />
                  ) : null}
                </Stack>
              </Table.ColumnHeader>
            )
          })}
        </Table.Row>
      ))}
    </Table.Header>
  )
}

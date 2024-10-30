import { Heading, Stack, Table } from '@chakra-ui/react'
import { flexRender, Table as ReactTable } from '@tanstack/react-table'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'

import { ProceedingsItem } from './ProceedingsTable'

//TODO: fix table header
//TODO: fix heading size

export function ProceedingsTableHeader({
  table,
}: {
  table: ReactTable<ProceedingsItem>
}) {
  return (
    <Table.Header textAlign="center">
      {table.getHeaderGroups().map((headerGroup) => (
        <Table.Row key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <Table.ColumnGroup
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
                  <Heading as="h4" size="h4">
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
              </Table.ColumnGroup>
            )
          })}
        </Table.Row>
      ))}
    </Table.Header>
  )
}

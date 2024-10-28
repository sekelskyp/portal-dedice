import { Heading, Stack, Th, Thead, Tr } from '@chakra-ui/react'
import { flexRender, Table } from '@tanstack/react-table'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'

import { ProceedingsItem } from './ProceedingsTable'

export function ProceedingsTableHeader({
  table,
}: {
  table: Table<ProceedingsItem>
}) {
  return (
    <Thead textAlign="center">
      {table.getHeaderGroups().map((headerGroup) => (
        <Tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <Th
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
                    <HiChevronUp fontSize="24px" />
                  ) : header.column.getIsSorted() === 'desc' ? (
                    <HiChevronDown fontSize="24px" />
                  ) : null}
                </Stack>
              </Th>
            )
          })}
        </Tr>
      ))}
    </Thead>
  )
}

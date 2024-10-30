import { Button, Flex, Select, Stack, Text } from '@chakra-ui/react'
import { Table } from '@tanstack/react-table'
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi'

import { ProceedingsItem } from './ProceedingsTable'

//TODO: fix chakra 3 select

export function ProceedingsTableFooter({
  table,
}: {
  table: Table<ProceedingsItem>
}) {
  return (
    <Flex justifyContent="space-between" m={4}>
      <Stack direction="row" alignItems="center">
        <Text>
          Zobrazuji 1 - {table.getState().pagination.pageSize} z{' '}
          {table.getRowCount()} záznamů.
        </Text>
      </Stack>
      <Stack direction="row" gap={2}>
        <Button
          className="border rounded p-1"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <HiChevronDoubleLeft />
        </Button>
        <Button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <HiChevronLeft />
        </Button>
        <Stack direction="row" alignItems="center" mx={4}>
          <Text>
            Stránka {table.getState().pagination.pageIndex + 1} z{' '}
            {table.getPageCount().toLocaleString()}
          </Text>
        </Stack>
        <Button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <HiChevronRight />
        </Button>
        <Button
          className="border rounded p-1"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          <HiChevronDoubleRight />
        </Button>
      </Stack>
      <Stack direction="row" alignItems="center">
        <Text>Zobrazit</Text>
        <Select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </Select>
        <Text>záznamů</Text>
      </Stack>
    </Flex>
  )
}

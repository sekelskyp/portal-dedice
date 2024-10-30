import { Button, Stack, Text } from '@chakra-ui/react'
import { Table } from '@tanstack/react-table'
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi2'

import { ProceedingsItem } from './proceedings-table/ProceedingsTable'

export function TablePagination({ table }: { table: Table<ProceedingsItem> }) {
  return (
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
        size="md"
      >
        <HiChevronLeft />
      </Button>
      <Stack direction="row" alignItems="center" mx={4} fontWeight="bold">
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
      {/*
      <PaginationRoot count={table.getRowCount()} defaultPage={1}>
        <Group attached>
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </Group>
      </PaginationRoot>
       */}
    </Stack>
  )
}

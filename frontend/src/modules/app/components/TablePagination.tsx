import { Button, Stack, Text } from '@chakra-ui/react'
import { Table } from '@tanstack/react-table'

import { paginationItems } from '../utils/table-pagination'

import { ProceedingsItem } from './proceedings-table/ProceedingsTable'

export function TablePagination({ table }: { table: Table<ProceedingsItem> }) {
  return (
    <Stack direction="row" gap={2}>
      <Stack direction="row" gap={2}>
        {paginationItems.slice(0, 2).map((item, index) => (
          <Button
            bg="gray.500"
            key={index}
            onClick={() => item.onClick(table)}
            disabled={item.disabled(table)}
          >
            {item.icon}
          </Button>
        ))}
      </Stack>
      <Stack direction="row" alignItems="center" mx={4} fontWeight="bold">
        <Text>
          Stránka {table.getState().pagination.pageIndex + 1} z{' '}
          {table.getPageCount().toLocaleString()}
        </Text>
      </Stack>
      <Stack direction="row" gap={2}>
        {paginationItems.slice(2, 4).map((item, index) => (
          <Button
            bg="gray.500"
            key={index + 2}
            onClick={() => item.onClick(table)}
            disabled={item.disabled(table)}
          >
            {item.icon}
          </Button>
        ))}
      </Stack>
    </Stack>
  )
}

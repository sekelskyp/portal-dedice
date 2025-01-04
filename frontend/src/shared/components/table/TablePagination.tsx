import { Button, Stack, Text } from '@chakra-ui/react'
import { Table } from '@tanstack/react-table'

import { createPaginationItems } from '../../utils/table-pagination'

export function TablePagination<TData>({ table }: { table: Table<TData> }) {
  const paginationItems = createPaginationItems<TData>()

  return (
    <Stack direction="row" gap={2}>
      <Stack direction="row" gap={2}>
        {paginationItems.slice(0, 2).map((item, index) => (
          <Button
            bg="gray.500"
            key={index}
            onClick={() => item.onClick(table)}
            disabled={item.disabled(table)}
            size={{ base: 'xs', lg: 'md' }}
          >
            {item.icon}
          </Button>
        ))}
      </Stack>
      <Stack direction="row" alignItems="center" mx={4} fontWeight="bold">
        <Text display={{ base: 'none', md: 'block' }}>
          Stránka {table.getState().pagination.pageIndex + 1} z{' '}
          {table.getPageCount().toLocaleString()}
        </Text>
        <Text
          fontSize={{ base: 'md', md: 'md' }}
          display={{ base: 'block', md: 'none' }}
        >
          {table.getState().pagination.pageIndex + 1} /{' '}
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
            size={{ base: 'xs', lg: 'md' }}
          >
            {item.icon}
          </Button>
        ))}
      </Stack>
    </Stack>
  )
}

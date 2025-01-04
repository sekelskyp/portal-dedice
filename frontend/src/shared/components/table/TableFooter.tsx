import { Box, Stack, Text } from '@chakra-ui/react'
import { Table } from '@tanstack/react-table'

import {
  NativeSelectField,
  NativeSelectRoot,
} from '@frontend/shared/design-system/atoms/chakra'

import { TablePagination } from './TablePagination'

const OPTIONS = [10, 20, 30, 40, 50]

export function TableFooter<TData>({ table }: { table: Table<TData> }) {
  return (
    <Stack
      direction={{ base: 'column', xl: 'row' }}
      justifyContent="space-between"
      alignItems="center"
      mx={{ base: 0, md: 4 }}
      mt={8}
      mb={4}
    >
      <Stack
        direction="row"
        alignItems="center"
        fontSize={{ base: 'sm', md: 'md' }}
        my={{ base: 2, lg: 0 }}
        order={{ base: 2, xl: 1 }}
      >
        <Text>
          Zobrazeno 1 - {table.getState().pagination.pageSize} z{' '}
          {table.getRowCount()} záznamů.
        </Text>
      </Stack>
      <Box order={{ base: 1, xl: 2 }}>
        <TablePagination table={table} />
      </Box>
      <Stack direction="row" alignItems="center" order={{ base: 3, xl: 3 }}>
        <Text fontSize={{ base: 'sm', md: 'md' }}>Zobrazit</Text>
        <NativeSelectRoot
          size={{ base: 'sm', md: 'md' }}
          my={{ base: 2, lg: 0 }}
        >
          <NativeSelectField
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
            justifyItems="center"
            justifyContent="center"
            alignItems="center"
          >
            {' '}
            {OPTIONS.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </NativeSelectField>
        </NativeSelectRoot>
        <Text fontSize={{ base: 'sm', md: 'md' }}>záznamů</Text>
      </Stack>
    </Stack>
  )
}

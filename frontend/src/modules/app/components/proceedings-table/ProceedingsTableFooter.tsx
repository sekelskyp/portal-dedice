import { Flex, Stack, Text } from '@chakra-ui/react'
import { Table } from '@tanstack/react-table'

import {
  NativeSelectField,
  NativeSelectRoot,
} from '@frontend/shared/design-system/atoms/chakra'

import { TablePagination } from '../TablePagination'

import { ProceedingsItem } from './ProceedingsTable'

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
      <TablePagination table={table} />
      <Stack direction="row" alignItems="center">
        <Text>Zobrazit</Text>
        <NativeSelectRoot>
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
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </NativeSelectField>
        </NativeSelectRoot>
        <Text>záznamů</Text>
      </Stack>
    </Flex>
  )
}

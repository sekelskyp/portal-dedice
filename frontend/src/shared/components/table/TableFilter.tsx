import React from 'react'
import { Input, NativeSelectRoot, Stack } from '@chakra-ui/react'
import { Column } from '@tanstack/react-table'

import { USER_TYPE_MAPPING } from '@frontend/modules/admin/utils/user-mapping'
import { NativeSelectField } from '@frontend/shared/design-system'

interface TableFilterProps<TData> {
  column: Column<TData, unknown>
}

export function TableFilter<TData>({ column }: TableFilterProps<TData>) {
  const { filterVariant } = column.columnDef.meta ?? {}
  const columnFilterValue = column.getFilterValue()

  const sortedUniqueValues = React.useMemo(() => {
    if (column.id === 'type') {
      return Object.keys(USER_TYPE_MAPPING)
    }
    return Array.from(column.getFacetedUniqueValues().keys())
      .filter(Boolean)
      .sort()
  }, [column])

  if (filterVariant === 'select') {
    return (
      <Stack>
        <NativeSelectRoot size="md">
          <NativeSelectField
            onChange={(e) => column.setFilterValue(e.target.value)}
            value={(columnFilterValue ?? '').toString()}
          >
            <option value="">Všechny</option>
            {sortedUniqueValues.map((value) => (
              <option value={value} key={value}>
                {column.id === 'type'
                  ? USER_TYPE_MAPPING[value as keyof typeof USER_TYPE_MAPPING]
                  : String(value)}
              </option>
            ))}
          </NativeSelectField>
        </NativeSelectRoot>
      </Stack>
    )
  }

  return (
    <Stack>
      <Input
        value={(columnFilterValue ?? '').toString()}
        onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder="Vyhledej..."
      />
    </Stack>
  )
}

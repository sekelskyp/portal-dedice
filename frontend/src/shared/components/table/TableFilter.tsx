import { useMemo } from 'react'
import { Input, Stack } from '@chakra-ui/react'
import { Column } from '@tanstack/react-table'
import { FaSearch } from 'react-icons/fa'
import { MdOutlineCancel } from 'react-icons/md'

import { USER_TYPE_MAPPING } from '@frontend/modules/admin/utils/user-mapping'
import {
  InputGroup,
  NativeSelectField,
  NativeSelectRoot,
} from '@frontend/shared/design-system'

interface TableFilterProps<TData> {
  column: Column<TData, unknown>
}

export function TableFilter<TData>({ column }: TableFilterProps<TData>) {
  const { filterVariant } = column.columnDef.meta ?? {}
  const columnFilterValue = column.getFilterValue()

  const sortedUniqueValues = useMemo(() => {
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
        <NativeSelectRoot size="md" minWidth={125}>
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
      <InputGroup
        startElement={<FaSearch size="18px" />}
        endElement={<MdOutlineCancel size="18px" />}
        endElementProps={{
          _hover: { cursor: 'pointer' },
          onClick: () => column.setFilterValue(''),
        }}
      >
        <Input
          value={(columnFilterValue ?? '').toString()}
          onChange={(e) => column.setFilterValue(e.target.value)}
          placeholder="Vyhledej..."
        />
      </InputGroup>
    </Stack>
  )
}

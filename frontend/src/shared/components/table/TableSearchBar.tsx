import { Dispatch, SetStateAction } from 'react'
import { Input } from '@chakra-ui/react'
import { Table } from '@tanstack/react-table'
import { FaSearch } from 'react-icons/fa'
import { MdOutlineCancel } from 'react-icons/md'

import { InputGroup } from '@frontend/shared/design-system'

export function TableSearchBar<TData>({
  table,
  setGlobalFilter,
}: {
  table: Table<TData>
  setGlobalFilter: Dispatch<SetStateAction<string>>
}) {
  return (
    <InputGroup
      width={{ base: '100%', lg: '50%', xl: '30%' }}
      startElement={<FaSearch size="18px" />}
      endElement={<MdOutlineCancel size="18px" />}
      endElementProps={{
        _hover: { cursor: 'pointer' },
        onClick: () => setGlobalFilter(''),
      }}
    >
      <Input
        placeholder="Vyhledej..."
        onChange={(e) => setGlobalFilter(e.target.value)}
        value={table.getState().globalFilter || ''}
        size="md"
      />
    </InputGroup>
  )
}

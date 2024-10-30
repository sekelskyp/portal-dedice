import { Dispatch, SetStateAction } from 'react'
import { Input, Stack } from '@chakra-ui/react'
import { Table } from '@tanstack/react-table'
import { FaSearch } from 'react-icons/fa'
import { MdOutlineCancel } from 'react-icons/md'

import { InputGroup } from '@frontend/shared/design-system'

import { ProceedingsItem } from './ProceedingsTable'

export function ProceedingsTableSearchBar({
  table,
  setGlobalFilter,
}: {
  table: Table<ProceedingsItem>
  setGlobalFilter: Dispatch<SetStateAction<string>>
}) {
  return (
    <Stack mb={4} p={1}>
      <InputGroup
        width="20%"
        startElement={<FaSearch size="18px" />}
        startElementProps={{ ml: 2 }}
        endElement={<MdOutlineCancel size="18px" />}
        endElementProps={{
          color: 'red.600',
          _hover: { cursor: 'pointer' },
          onClick: () => setGlobalFilter(''),
        }}
      >
        <Input
          placeholder="Vyhledej..."
          onChange={(e) => setGlobalFilter(e.target.value)}
          value={table.getState().globalFilter || ''}
          size="md"
          ml={2}
        />
      </InputGroup>
    </Stack>
  )
}

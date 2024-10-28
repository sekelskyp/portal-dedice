import { Dispatch, SetStateAction } from 'react'
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from '@chakra-ui/react'
import { Table } from '@tanstack/react-table'
import { FaSearch } from 'react-icons/fa'
import { MdOutlineCancel } from 'react-icons/md'

import { ProceedingsItem } from './ProceedingsTable'

export function ProceedingsTableSearchBar({
  table,
  setGlobalFilter,
}: {
  table: Table<ProceedingsItem>
  setGlobalFilter: Dispatch<SetStateAction<string>>
}) {
  return (
    <Stack mb={4}>
      <InputGroup width="20%">
        <InputLeftElement>
          <FaSearch />
        </InputLeftElement>
        <Input
          placeholder="Vyhledej..."
          onChange={(e) => setGlobalFilter(e.target.value)}
          value={table.getState().globalFilter || ''}
          size="md"
          pl={10}
        />
        <InputRightElement
          _hover={{ cursor: 'pointer' }}
          onClick={() => setGlobalFilter('')}
        >
          <MdOutlineCancel />
        </InputRightElement>
      </InputGroup>
    </Stack>
  )
}

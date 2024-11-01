import { Dispatch, SetStateAction } from 'react'
import { Button, Input, Stack, Text } from '@chakra-ui/react'
import { Table } from '@tanstack/react-table'
import { FaSearch } from 'react-icons/fa'
import { MdNoteAdd, MdOutlineCancel } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { useAuth } from '@frontend/modules/auth'
import { InputGroup } from '@frontend/shared/design-system'
import { route } from '@shared/route'

import { ProceedingsItem } from './ProceedingsTable'

export function ProceedingsTableSearchBar({
  table,
  setGlobalFilter,
}: {
  table: Table<ProceedingsItem>
  setGlobalFilter: Dispatch<SetStateAction<string>>
}) {
  const user = useAuth()

  return (
    <Stack
      mb={10}
      p={1}
      direction={{ base: 'column', lg: 'row' }}
      justifyContent="space-between"
    >
      <InputGroup
        width={{ base: '100%', lg: '50%', xl: '30%' }}
        startElement={<FaSearch size="18px" />}
        startElementProps={{ ml: 2 }}
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
          ml={2}
        />
      </InputGroup>
      {!user.user?.isNotary && (
        <Link to={route.newProceeding()}>
          <Button rounded="full" bg="gray.500" _hover={{ bg: 'gray.700' }}>
            <Text display={{ base: 'none', md: 'flex' }}>
              Vytvořit nové řízení
            </Text>
            <MdNoteAdd />
          </Button>
        </Link>
      )}
    </Stack>
  )
}

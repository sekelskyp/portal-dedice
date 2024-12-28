import { useMemo, useState } from 'react'
import { IconButton, Stack } from '@chakra-ui/react'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  FilterFn,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table'
import { MdDelete } from 'react-icons/md'

import { UserItem } from '../components/UserTable'

const INITIAL_SORTING_STATE = [
  {
    id: 'id',
    desc: false,
  },
]

const USER_TYPE_MAPPING = {
  Notary: 'Notář',
  Admin: 'Admin',
  User: 'Uživatel',
} as const

const fuzzyFilter: FilterFn<UserItem> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

const columnHelper = createColumnHelper<UserItem>()

export function useUsersTable({ data }: { data: UserItem[] }) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: () => 'ID',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('displayName', {
        header: () => 'Jméno a přijmení',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('address', {
        header: () => 'Adresa',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('type', {
        header: () => 'Role',
        cell: (info) =>
          USER_TYPE_MAPPING[info.getValue() as keyof typeof USER_TYPE_MAPPING],
      }),
      columnHelper.display({
        id: 'actions',
        header: () => 'Aktivace / Deaktivace',
        cell: (info) => {
          const id = info.row.original.id
          return (
            <Stack direction="row" alignItems="center">
              <IconButton
                borderRadius="xl"
                bg="red.600"
                onClick={() => {
                  console.log(id)
                }}
                size="sm"
              >
                <MdDelete />
              </IconButton>
            </Stack>
          )
        },
        enableSorting: false,
      }),
    ],
    []
  )

  const table = useReactTable({
    columns,
    data,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      globalFilter,
      pagination,
    },
    initialState: {
      sorting: INITIAL_SORTING_STATE,
    },
    globalFilterFn: fuzzyFilter,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return { table, setGlobalFilter }
}

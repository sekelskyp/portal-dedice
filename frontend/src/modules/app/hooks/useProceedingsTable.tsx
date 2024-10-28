import { useMemo, useState } from 'react'
import { Badge, Button } from '@chakra-ui/react'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  ColumnDef,
  FilterFn,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table'
import { HiChevronRight } from 'react-icons/hi'

import { ProceedingsItem } from '../components/ProceedingsTable'

const INITIAL_SORTING_STATE = [
  {
    id: 'status',
    desc: false,
  },
]

const fuzzyFilter: FilterFn<ProceedingsItem> = (
  row,
  columnId,
  value,
  addMeta
) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

export function useProceedingsTable({ data }: { data: ProceedingsItem[] }) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const [globalFilter, setGlobalFilter] = useState<string>('')

  const columns = useMemo<ColumnDef<ProceedingsItem>[]>(
    () => [
      {
        accessorKey: 'id',
        header: () => 'ID',
        filterFn: 'includesString',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'date',
        header: () => 'Datum založení',
      },
      {
        accessorKey: 'status',
        header: () => 'Status',
        cell: (info) => {
          return (
            <Badge
              bg={info.getValue() === 'Probíhající' ? 'green.700' : 'red.700'}
              color="white"
              variant="subtle"
              style={{ textTransform: 'none' }}
              px={4}
              py={2}
              borderRadius="xl"
              width="120px"
              fontSize="sm"
            >
              {info.getValue() as React.ReactNode}
            </Badge>
          )
        },
      },
      {
        accessorKey: 'detail',
        header: () => 'Detail',
        cell: () => {
          return (
            <Button size="sm">
              <HiChevronRight size="24px" />
            </Button>
          )
        },
      },
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

import { useMemo, useState } from 'react'
import { Button } from '@chakra-ui/react'
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

import { ProceedingsItem } from '../components/proceedings-table/ProceedingsTable'
import { StatusBadge } from '../components/StatusBadge'

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
          return <StatusBadge info={info} />
        },
      },
      {
        accessorKey: 'detail',
        header: () => 'Detail řízení',
        cell: () => {
          return (
            <Button size={{ base: 'xs', md: 'sm' }} bg="primary.500">
              <HiChevronRight size="24px" />
            </Button>
          )
        },
        enableSorting: false,
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

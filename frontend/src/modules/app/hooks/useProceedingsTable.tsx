import { useMemo, useState } from 'react'
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
import { CgDetailsMore } from 'react-icons/cg'

import { RouterNavLink } from '@frontend/shared/navigation/atoms'
import { route } from '@shared/route'

import { ProceedingsItem } from '../components/proceedings-table/ProceedingsTable'
import { StatusBadge } from '../components/StatusBadge'

const INITIAL_SORTING_STATE = [
  {
    id: 'state',
    desc: true,
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
        accessorKey: 'detail',
        header: () => '',
        size: 0,
        cell: (info) => {
          const id = info.row.original.id
          return (
            <RouterNavLink
              key={id}
              to={route.inheritanceProcedure(id.toString())}
              size="sm"
            >
              <CgDetailsMore />
            </RouterNavLink>
          )
        },
        enableSorting: false,
      },
      {
        accessorKey: 'name',
        header: () => 'ID',
        filterFn: 'includesString',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'deceasedContact.displayName',
        header: () => 'Zůstavitel',
        cell: (info) => {
          const name = info.getValue() as string
          return name
        },
      },
      {
        accessorKey: 'startDate',
        header: () => 'Datum založení',
        cell: (info) => {
          const date = info.getValue() as string
          const formattedDate = date ? date.split('T')[0] : ''
          return formattedDate
        },
      },
      {
        accessorKey: 'state',
        header: () => 'Status',
        cell: (info) => {
          const state = info.getValue() as string
          return <StatusBadge state={state} />
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

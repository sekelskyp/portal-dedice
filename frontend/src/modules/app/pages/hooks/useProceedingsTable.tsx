import { useMemo, useState } from 'react'
import { Button } from '@chakra-ui/react'
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table'

import { ProceedingsItem } from '../../components/ProceedingsTable'

export function useProceedingsTable({ data }: { data: ProceedingsItem[] }) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const columns = useMemo<ColumnDef<ProceedingsItem>[]>(
    () => [
      {
        accessorKey: 'id',
        header: () => 'ID',
      },
      {
        accessorKey: 'date',
        header: () => 'Date',
      },
      {
        accessorKey: 'status',
        header: () => 'Status',
      },
      {
        accessorKey: 'detail',
        header: () => 'Detail',
        cell: () => {
          return <Button>Detail</Button>
        },
      },
    ],
    []
  )

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  })

  return { table }
}

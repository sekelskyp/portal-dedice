import { useCallback, useMemo, useState } from 'react'
import { Flex, IconButton, Stack, useBreakpoint } from '@chakra-ui/react'
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
import { SquareArrowOutUpRight as SquareArrowOutUpRightIcon } from 'lucide-react'
import { MdDelete } from 'react-icons/md'

import { useAuth } from '@frontend/modules/auth'
import { RouterNavLink } from '@frontend/shared/navigation/atoms'
import { route } from '@shared/route'

import { ProceedingsItem } from '../components/proceedings-table/ProceedingsTable'
import { StatusBadge } from '../components/StatusBadge'

import { useDeleteProcedure } from './useDeleteProcedure'

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

const columnHelper = createColumnHelper<ProceedingsItem>()

export function useProceedingsTable({ data }: { data: ProceedingsItem[] }) {
  const { user } = useAuth()

  const [deleteProcedureRequest] = useDeleteProcedure()

  const handleProcedureDelete = useCallback(
    (id: string) => {
      deleteProcedureRequest({
        variables: {
          ids: [parseInt(id)],
        },
      })
    },
    [deleteProcedureRequest]
  )

  const breakpoint = useBreakpoint({ breakpoints: ['base', 'sm', 'xl'] })
  const isMobile = breakpoint === 'base'
  // const isDesktop = breakpoint === 'xl'
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const [globalFilter, setGlobalFilter] = useState<string>('')

  const columns = useMemo(() => {
    const columns = [
      columnHelper.accessor('deceasedContact.displayName', {
        header: () => 'Zůstavitel',
        cell: (info) => {
          const name = info.getValue() as string
          return name
        },
      }),
    ]

    if (!isMobile) {
      columns.push(
        columnHelper.accessor('name', {
          header: () => 'ID',
          cell: (info) => info.getValue(),
        })
      )
      columns.push(
        columnHelper.accessor('startDate', {
          header: () => 'Datum zahájení',
          cell: (info) => {
            const date = info.getValue() as string
            const formattedDate = date ? date.split('T')[0] : ''
            return formattedDate
          },
        })
      )
    }

    columns.push(
      columnHelper.accessor('state', {
        header: () => 'Status',
        cell: (info) => {
          const state = info.getValue() as string
          return (
            <Flex justifyContent="start">
              <StatusBadge state={state} />
            </Flex>
          )
        },
      })
    )

    columns.push(
      columnHelper.accessor('id', {
        header: () => '',
        size: 0,
        cell: (info) => {
          const id = info.row.original.id
          return (
            <Stack direction="row" alignItems="center">
              <RouterNavLink
                key={id}
                to={route.inheritanceProcedure(id.toString())}
                size="xs"
                variant="subtle"
              >
                <SquareArrowOutUpRightIcon />
              </RouterNavLink>
              {user?.isNotary && (
                <IconButton
                  borderRadius="xl"
                  bg="red.600"
                  onClick={() => handleProcedureDelete(id)}
                >
                  <MdDelete />
                </IconButton>
              )}
            </Stack>
          )
        },
        enableSorting: false,
      })
    )

    return columns
  }, [isMobile, handleProcedureDelete, user?.isNotary])

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

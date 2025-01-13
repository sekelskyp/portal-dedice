import { useCallback, useMemo } from 'react'
import { Flex, Icon, IconButton, Stack, useBreakpoint } from '@chakra-ui/react'
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { SquareArrowOutUpRight as SquareArrowOutUpRightIcon } from 'lucide-react'
import { MdDelete } from 'react-icons/md'

import { useAuth } from '@frontend/modules/auth'
import { useActionDialog } from '@frontend/shared/hooks/useActionDialog'
import { useTableFilters } from '@frontend/shared/hooks/useTableFilters'
import { useTablePagination } from '@frontend/shared/hooks/useTablePagination'
import { RouterNavLink } from '@frontend/shared/navigation/atoms'
import {
  fuzzyFilter,
  INITIAL_SORTING_STATE_PROCEEDINGS,
} from '@frontend/shared/utils/table-utils'
import { route } from '@shared/route'

import { ProceedingsItem } from '../components/ProceedingsTable'
import { StatusBadge } from '../components/StatusBadge'
import { useDeleteProceeding } from '../hooks/useDeleteProceeding'

const columnHelper = createColumnHelper<ProceedingsItem>()

export function useProceedingsTable({ data }: { data: ProceedingsItem[] }) {
  const { toggleDialog, isOpen, selectedId } = useActionDialog()
  const { user } = useAuth()
  const hasPrivileges = user?.type === 'Notary' || user?.type === 'Admin'
  const [deleteProcedureRequest] = useDeleteProceeding()

  const { pagination, setPagination } = useTablePagination()
  const { globalFilter, setGlobalFilter } = useTableFilters()
  const breakpoint = useBreakpoint({ breakpoints: ['base', 'sm', 'xl'] })
  const isMobile = breakpoint === 'base'

  const handleProcedureDelete = useCallback(() => {
    if (selectedId) {
      deleteProcedureRequest({
        variables: {
          ids: [parseInt(selectedId)],
        },
      })
    }
  }, [deleteProcedureRequest, selectedId])

  const columns = useMemo(() => {
    const columns = [
      columnHelper.accessor('deceasedDisplayName', {
        header: () => 'Zůstavitel',
        cell: (info) => {
          const name = info.getValue() as string
          return name
        },
        enableColumnFilter: false,
      }),
    ]

    if (!isMobile) {
      columns.push(
        columnHelper.accessor('name', {
          header: () => 'ID',
          cell: (info) => info.getValue(),
          enableColumnFilter: false,
        })
      )
      columns.push(
        columnHelper.accessor('startDate', {
          header: () => 'Datum zahájení',
          cell: (info) => {
            const date = info.getValue()
            const formattedDate = new Date(date).toLocaleDateString()
            return formattedDate
          },
          enableColumnFilter: false,
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
        enableColumnFilter: false,
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
              {hasPrivileges && (
                <IconButton
                  borderRadius="xl"
                  bg="red.600"
                  onClick={() => toggleDialog(true, id)}
                >
                  <MdDelete />
                </IconButton>
              )}
              <RouterNavLink
                key={id}
                to={route.proceeding(id.toString())}
                size="md"
                variant="subtle"
                borderRadius="xl"
              >
                <Icon mx={-1} size="lg">
                  <SquareArrowOutUpRightIcon />
                </Icon>
              </RouterNavLink>
            </Stack>
          )
        },
        enableColumnFilter: false,
        enableSorting: false,
      })
    )

    return columns
  }, [isMobile, hasPrivileges, toggleDialog])

  const table = useReactTable({
    columns,
    data,
    filterFns: {
      fuzzy: fuzzyFilter<ProceedingsItem>(),
    },
    state: {
      globalFilter,
      pagination,
    },
    initialState: {
      sorting: INITIAL_SORTING_STATE_PROCEEDINGS,
    },
    globalFilterFn: fuzzyFilter<ProceedingsItem>(),
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return {
    table,
    setGlobalFilter,
    dialog: {
      isOpen,
      toggleDialog,
      selectedId,
      handleProcedureDelete,
    },
  }
}

import { useCallback, useMemo, useState } from 'react'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  ColumnFiltersState,
  createColumnHelper,
  FilterFn,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table'

import { useActionDialog } from '@frontend/shared/hooks/useActionDialog'

import { UserActionButton } from '../components/UserActionButton'
import { UserItem } from '../components/UserTable'
import { USER_TYPE_MAPPING } from '../utils/user-mapping'

import { useChangeUserStatus } from './useChangeUserStatus'

const INITIAL_SORTING_STATE = [
  {
    id: 'id',
    desc: false,
  },
]

const fuzzyFilter: FilterFn<UserItem> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

const columnHelper = createColumnHelper<UserItem>()

export function useUsersTable({ data }: { data: UserItem[] }) {
  const { toggleDialog, isOpen, selectedId } = useActionDialog()
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null)
  const [changeUserStatusRequest] = useChangeUserStatus()

  const handleUserStatusChange = useCallback(() => {
    if (selectedId) {
      changeUserStatusRequest({
        variables: {
          userId: parseInt(selectedId),
        },
      })
    }
  }, [changeUserStatusRequest, selectedId])

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const [globalFilter, setGlobalFilter] = useState('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: () => 'ID',
        cell: (info) => info.getValue(),
        enableColumnFilter: false,
      }),
      columnHelper.accessor('displayName', {
        header: () => 'Jméno a přijmení',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: 'text',
        },
      }),
      columnHelper.accessor('address', {
        header: () => 'Adresa',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: 'text',
        },
      }),
      columnHelper.accessor('type', {
        header: () => 'Role',
        cell: (info) => {
          const value = info.getValue()
          return (
            USER_TYPE_MAPPING[value as keyof typeof USER_TYPE_MAPPING] || value
          )
        },
        meta: {
          filterVariant: 'select',
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: () => '',
        cell: (info) => {
          const user = info.row.original
          const isActive = user.confirmed
          return (
            <UserActionButton
              key={user.id}
              user={user}
              isActive={isActive}
              setSelectedUser={setSelectedUser}
              toggleDialog={toggleDialog}
            />
          )
        },
        enableSorting: false,
      }),
    ],
    [toggleDialog]
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
      columnFilters,
    },
    initialState: {
      sorting: INITIAL_SORTING_STATE,
    },
    globalFilterFn: fuzzyFilter,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
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
      handleUserStatusChange,
      selectedUser,
    },
  }
}

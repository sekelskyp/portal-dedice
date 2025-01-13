import { useCallback, useMemo, useState } from 'react'
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { useGetNotaryAddressRuleById } from '@frontend/modules/app/settings/hooks/useGetNotaryRules'
import { getPlaceByPostalCode } from '@frontend/modules/app/utils/addressUtils'
import { useActionDialog } from '@frontend/shared/hooks/useActionDialog'
import { useTableFilters } from '@frontend/shared/hooks/useTableFilters'
import { useTablePagination } from '@frontend/shared/hooks/useTablePagination'
import {
  fuzzyFilter,
  INITIAL_SORTING_STATE_USERS,
} from '@frontend/shared/utils/table-utils'

import { UserActionButton } from '../components/UserActionButton'
import { UserItem } from '../components/UserTable'
import { USER_TYPE_MAPPING } from '../utils/user-mapping'

import { useChangeUserStatus } from './useChangeUserStatus'

const columnHelper = createColumnHelper<UserItem>()

export function useUsersTable({ data }: { data: UserItem[] }) {
  const { toggleDialog, isOpen, selectedId } = useActionDialog()
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null)
  const [changeUserStatusRequest] = useChangeUserStatus()

  const { pagination, setPagination } = useTablePagination()
  const { globalFilter, setGlobalFilter, columnFilters, setColumnFilters } =
    useTableFilters()

  const handleUserStatusChange = useCallback(() => {
    if (selectedId) {
      changeUserStatusRequest({
        variables: {
          userId: parseInt(selectedId),
        },
      })
    }
  }, [changeUserStatusRequest, selectedId])

  const GetNotaryAddressRuleById = (id: number) => {
    return useGetNotaryAddressRuleById({ id }).data?.getNotaryById?.postalCode
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: () => 'ID',
        cell: (info) => info.getValue(),
        enableColumnFilter: false,
      }),
      columnHelper.accessor('displayName', {
        header: () => 'Jméno a přijmení',
        cell: (info) => {
          const user = info.row.original
          const displayName = info.getValue()
          let place = ''
          if (user.type === 'Notary') {
            const postalCode = GetNotaryAddressRuleById(Number(user.notaryId))
            place = ' – ' + getPlaceByPostalCode(postalCode ?? '')
          }
          return displayName + place
        },
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
        enableGlobalFilter: false,
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
        enableGlobalFilter: false,
      }),
    ],
    [toggleDialog]
  )

  const table = useReactTable({
    columns,
    data,
    filterFns: {
      fuzzy: fuzzyFilter<UserItem>(),
    },
    state: {
      globalFilter,
      pagination,
      columnFilters,
    },
    initialState: {
      sorting: INITIAL_SORTING_STATE_USERS,
    },
    globalFilterFn: fuzzyFilter<UserItem>(),
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

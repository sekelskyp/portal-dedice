import { Table } from '@tanstack/react-table'
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi2'

import { ProceedingsItem } from '../proceedings-table/ProceedingsTable'

const paginationItems = [
  {
    onClick: (table: Table<ProceedingsItem>) => table.firstPage(),
    disabled: (table: Table<ProceedingsItem>) => !table.getCanPreviousPage(),
    icon: <HiChevronDoubleLeft />,
  },
  {
    onClick: (table: Table<ProceedingsItem>) => table.previousPage(),
    disabled: (table: Table<ProceedingsItem>) => !table.getCanPreviousPage(),
    icon: <HiChevronLeft />,
  },
  {
    onClick: (table: Table<ProceedingsItem>) => table.nextPage(),
    disabled: (table: Table<ProceedingsItem>) => !table.getCanNextPage(),
    icon: <HiChevronRight />,
  },
  {
    onClick: (table: Table<ProceedingsItem>) => table.lastPage(),
    disabled: (table: Table<ProceedingsItem>) => !table.getCanNextPage(),
    icon: <HiChevronDoubleRight />,
  },
]

export { paginationItems }

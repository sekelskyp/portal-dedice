import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi2'

import { TableActions } from '../types/table'

function createPaginationItems<T>(): TableActions<T>[] {
  return [
    {
      onClick: (table) => table.firstPage(),
      disabled: (table) => !table.getCanPreviousPage(),
      icon: <HiChevronDoubleLeft />,
    },
    {
      onClick: (table) => table.previousPage(),
      disabled: (table) => !table.getCanPreviousPage(),
      icon: <HiChevronLeft />,
    },
    {
      onClick: (table) => table.nextPage(),
      disabled: (table) => !table.getCanNextPage(),
      icon: <HiChevronRight />,
    },
    {
      onClick: (table) => table.lastPage(),
      disabled: (table) => !table.getCanNextPage(),
      icon: <HiChevronDoubleRight />,
    },
  ]
}

export { createPaginationItems }

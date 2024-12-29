import { useState } from 'react'
import { ColumnFiltersState } from '@tanstack/react-table'

export function useTableFilters() {
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  return {
    globalFilter,
    setGlobalFilter,
    columnFilters,
    setColumnFilters,
  }
}

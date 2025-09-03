import { Table } from '@tanstack/react-table'

export type TableActions<T> = {
  onClick: (table: Table<T>) => void
  disabled: (table: Table<T>) => boolean
  icon: JSX.Element
}

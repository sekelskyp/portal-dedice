import { rankItem } from '@tanstack/match-sorter-utils'
import { FilterFn } from '@tanstack/react-table'

export const INITIAL_SORTING_STATE = [
  {
    id: 'state',
    desc: true,
  },
]

export const fuzzyFilter = <T extends object>(): FilterFn<T> => {
  return (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({ itemRank })
    return itemRank.passed
  }
}

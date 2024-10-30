import { Badge } from '@chakra-ui/react'
import { CellContext } from '@tanstack/react-table'

import { ProceedingsItem } from './proceedings-table/ProceedingsTable'

const options = ['Probíhající', 'Ukončené']

export function StatusBadge({
  info,
}: {
  info: CellContext<ProceedingsItem, unknown>
}) {
  return (
    <Badge
      bg={info.getValue() === options[0] ? 'green.700' : 'red.700'}
      color="white"
      variant="subtle"
      style={{ textTransform: 'none' }}
      px={4}
      py={2}
      borderRadius="xl"
      width="110px"
      fontSize="sm"
      justifyContent="center"
    >
      {info.getValue() as React.ReactNode}
    </Badge>
  )
}

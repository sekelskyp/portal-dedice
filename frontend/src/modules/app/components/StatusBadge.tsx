import { Badge, useBreakpointValue } from '@chakra-ui/react'
import { CellContext } from '@tanstack/react-table'
import { FaCheck, FaTimesCircle } from 'react-icons/fa'

import { ProceedingsItem } from './proceedings-table/ProceedingsTable'

const statusMapping = {
  InProgress: 'Probíhající',
  Closed: 'Ukončené',
}

export function StatusBadge({
  info,
}: {
  info: CellContext<ProceedingsItem, unknown>
}) {
  const stateValue = info.getValue() as keyof typeof statusMapping
  const state = statusMapping[stateValue]

  const component = useBreakpointValue({
    base: state === 'Probíhající' ? <FaCheck /> : <FaTimesCircle />,
    md: state,
  })

  return (
    <Badge
      bg={state === 'Probíhající' ? 'green.700' : 'red.700'}
      color="white"
      variant="subtle"
      style={{ textTransform: 'none' }}
      px={4}
      py={2}
      borderRadius="xl"
      width={{ base: 'auto', lg: '110px' }}
      fontSize={{ base: 'xs', lg: 'sm' }}
      justifyContent="center"
    >
      {component}
    </Badge>
  )
}

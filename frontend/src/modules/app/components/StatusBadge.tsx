import { Badge, useBreakpointValue } from '@chakra-ui/react'
import { CellContext } from '@tanstack/react-table'
import { FaCheck, FaTimesCircle } from 'react-icons/fa'

import { ProceedingsItem } from './proceedings-table/ProceedingsTable'

const options = ['Probíhající', 'Ukončené']

export function StatusBadge({
  info,
}: {
  info: CellContext<ProceedingsItem, unknown>
}) {
  const component = useBreakpointValue({
    base: info.getValue() === options[0] ? <FaCheck /> : <FaTimesCircle />,
    md: info.getValue() as React.ReactNode,
  })

  return (
    <Badge
      bg={info.getValue() === options[0] ? 'green.700' : 'red.700'}
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

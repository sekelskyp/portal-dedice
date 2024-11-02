import { Badge, useBreakpointValue } from '@chakra-ui/react'
import { FaCheck, FaTimesCircle } from 'react-icons/fa'

const statusMapping = {
  InProgress: 'Probíhající',
  Closed: 'Ukončené',
}

export function StatusBadge({ state }: { state: string }) {
  const stateValue = state as keyof typeof statusMapping
  console.log(stateValue)
  const stateMapped = statusMapping[stateValue]
  console.log(stateMapped)

  const component = useBreakpointValue({
    base: stateMapped === 'Probíhající' ? <FaCheck /> : <FaTimesCircle />,
    md: stateMapped,
  })

  return (
    <Badge
      bg={stateMapped === 'Probíhající' ? 'green.700' : 'red.700'}
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

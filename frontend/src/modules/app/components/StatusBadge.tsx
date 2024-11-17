import { Badge, BadgeProps, useBreakpointValue } from '@chakra-ui/react'
import { Check as CheckIcon, History as HistoryIcon } from 'lucide-react'

const statusMapping = {
  InProgress: 'Probíhající',
  Closed: 'Ukončené',
}

export function StatusBadge({
  state,
  ...rest
}: { state: string } & BadgeProps) {
  const stateValue = state as keyof typeof statusMapping
  const stateMapped = statusMapping[stateValue]

  const component = useBreakpointValue({
    base: stateMapped === 'Probíhající' ? <CheckIcon /> : <HistoryIcon />,
    md: stateMapped,
  })

  return (
    <Badge
      bg={stateMapped === 'Probíhající' ? 'green.700' : 'red.700'}
      color="white"
      variant="subtle"
      px={4}
      py={2}
      width={{ base: 'auto', lg: '110px' }}
      fontSize={{ base: 'xs', lg: 'sm' }}
      justifyContent="center"
      {...rest}
    >
      {component}
    </Badge>
  )
}

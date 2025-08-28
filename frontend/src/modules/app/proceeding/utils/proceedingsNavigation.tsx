import { route } from '@lib/route'
import { FaCalculator } from 'react-icons/fa'
import { MdQueuePlayNext } from 'react-icons/md'

const proceedingsNavigation = [
  {
    link: route.wizard(),
    text: 'Chci vědět jak řízení probíhá',
    icon: <MdQueuePlayNext />,
  },
  {
    link: route.inheritance(),
    text: 'Chci si zkusit modelaci dědění',
    icon: <FaCalculator />,
  },
]

export { proceedingsNavigation }

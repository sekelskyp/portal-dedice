import { route } from '@shared/route'

const proceedingsNavigation = [
  {
    link: route.home(),
    text: 'Vytvořit nové řízení',
  },
  {
    link: route.wizard(),
    text: 'Chci vědět jak řízení probíhá',
  },
  {
    link: route.home(),
    text: 'Chci se na schůzku připravit',
  },
  {
    link: route.home(),
    text: 'Chci si zkusit modelaci dědění',
  },
]

export { proceedingsNavigation }

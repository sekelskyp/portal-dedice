import { route } from '@shared/route'

export const footerLinks = [
  {
    id: 1,
    title: 'Navigace',
    links: [
      {
        id: 1,
        title: 'Domů',
        link: route.home(),
      },

      {
        id: 2,
        title: 'Portál',
        link: route.portal(),
      },
      {
        id: 3,
        title: 'Nachytřovadlo',
        link: route.wizard(),
      },
      {
        id: 4,
        title: 'Blog',
        link: route.blog(),
      },
    ],
  },
  {
    id: 2,
    title: 'Informace',
    links: [
      {
        id: 1,
        title: 'O nás',
        link: route.about(),
      },
      {
        id: 2,
        title: 'Jak to funguje',
        link: route.guide(),
      },
      {
        id: 3,
        title: 'Podmínky užívání',
        link: route.termOfService(),
      },
      {
        id: 4,
        title: 'Kontakt',
        link: route.home(),
      },
    ],
  },
]

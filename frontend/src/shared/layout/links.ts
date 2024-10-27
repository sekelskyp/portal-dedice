import { route } from '@frontend/route'

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
        title: 'FAQ',
        link: route.home(),
      },
    ],
  },
  {
    id: 3,
    title: 'Ostatní',
    links: [
      {
        id: 1,
        title: 'Podmínky užívání',
        link: route.home(),
      },
      {
        id: 2,
        title: 'Kontakt',
        link: route.home(),
      },
      {
        id: 3,
        title: 'Blog',
        link: route.blog(),
      },
    ],
  },
]

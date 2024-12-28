import {
  ArchiveIcon,
  MessagesSquareIcon,
  SettingsIcon,
  User2Icon,
} from 'lucide-react'

import resources from '@frontend/resources'
import { route } from '@shared/route'

import { SideBarItem } from '../components/SideBar'

export const sideBarItems: SideBarItem[] = [
  {
    label: resources.portal.sideBar.proceedings,
    to: route.portal(),
    icon: <ArchiveIcon />,
  },
  {
    label: resources.portal.sideBar.profile,
    to: route.profile(),
    icon: <User2Icon />,
  },
  {
    label: 'Chat',
    to: route.chat(),
    icon: <MessagesSquareIcon />,
  },
  {
    label: resources.portal.sideBar.settings,
    to: route.settings(),
    icon: <SettingsIcon />,
  },
]

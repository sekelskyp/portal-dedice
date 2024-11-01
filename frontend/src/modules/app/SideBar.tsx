import { ReactElement } from 'react'
import { IconButton, Separator, Text, VStack } from '@chakra-ui/react'
import { LuArchive, LuFolderPlus, LuSettings, LuUser2 } from 'react-icons/lu'

import resources from '@frontend/resources'
import { RouterNavLink } from '@frontend/shared/navigation/atoms/RouterNavLink'
import { route } from '@shared/route'

export interface SideBarItem {
  label: string
  to: string
  icon?: ReactElement
}

const sideBarItems: SideBarItem[] = [
  {
    label: resources.portal.sideBar.profile,
    to: route.portal(),
    icon: <LuUser2 />,
  },
  {
    label: resources.portal.sideBar.proceedings,
    to: route.portal(),
    icon: <LuArchive />,
  },
  {
    label: resources.portal.sideBar.newProceeding,
    to: route.newProceeding(),
    icon: <LuFolderPlus />,
  },
  {
    label: resources.portal.sideBar.settings,
    to: route.settings(),
    icon: <LuSettings />,
  },
]

export default function SideBar() {
  return (
    <VStack align="left">
      {sideBarItems.map(({ to, label, icon, ...rest }) => (
        <>
          <IconButton variant="ghost" size="lg" justifyContent="start" px={4}>
            {icon}
            <RouterNavLink variant="ghost" to={to} key={to} {...rest}>
              <Text fontSize="md">{label}</Text>
            </RouterNavLink>
          </IconButton>
          <Separator size="md" />
        </>
      ))}
    </VStack>
  )
}

import React, { ReactElement } from 'react'
import {
  Center,
  HStack,
  IconButton,
  Separator,
  Text,
  VStack,
} from '@chakra-ui/react'
import { LuArchive, LuFolderPlus, LuSettings, LuUser2 } from 'react-icons/lu'
import { useMediaQuery } from 'usehooks-ts'

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
  const isMobile = useMediaQuery('(max-width: 425px)')
  return !isMobile ? (
    <VStack align="left">
      {sideBarItems.map(({ to, label, icon, ...rest }) => (
        <React.Fragment key={to}>
          <IconButton variant="ghost" size="lg" justifyContent="start" px={4}>
            {icon}
            <RouterNavLink variant="ghost" to={to} {...rest}>
              <Text fontSize="md">{label}</Text>
            </RouterNavLink>
          </IconButton>
          <Separator size="md" />
        </React.Fragment>
      ))}
    </VStack>
  ) : (
    <HStack align="top" justifyContent={'center'}>
      {sideBarItems.map(({ to, label, icon, ...rest }) => (
        <React.Fragment key={to}>
          <IconButton
            bg="gray.200"
            variant="ghost"
            size="sm"
            justifyContent="center"
            px={2}
            _active={{ bg: 'gray.400' }} // Highlight when active
          >
            <RouterNavLink variant="ghost" to={to} {...rest}>
              {icon}
            </RouterNavLink>
          </IconButton>
        </React.Fragment>
      ))}
    </HStack>
  )
}

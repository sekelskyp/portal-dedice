import React, { ReactElement } from 'react'
import { HStack, Icon, Separator, Text, VStack } from '@chakra-ui/react'
import {
  ArchiveIcon,
  MessagesSquareIcon,
  SettingsIcon,
  User2Icon,
} from 'lucide-react'
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

export default function SideBar() {
  const isMobile = useMediaQuery('(max-width: 425px)')
  return !isMobile ? (
    <VStack align="left" gap={0}>
      {sideBarItems.map(({ to, label, icon, ...rest }, index) => (
        <React.Fragment key={index}>
          <RouterNavLink
            variant="ghost"
            size="lg"
            justifyContent="start"
            to={to}
            {...rest}
            asChild
            letterSpacing={0.5}
            gap={6}
          >
            {icon}
            {label}
          </RouterNavLink>
          {index !== sideBarItems.length - 1 && (
            <Separator borderColor="bg.muted" mx={1} w={'calc(100% - 8px)'} />
          )}
        </React.Fragment>
      ))}
    </VStack>
  ) : (
    <HStack align="top" justifyContent="space-between" gap={1} flexWrap="wrap">
      {sideBarItems.map(({ to, label, icon, ...rest }) => (
        <RouterNavLink
          key={to}
          variant="subtle"
          size="xs"
          to={to}
          {...rest}
          gap={2}
        >
          <Icon size="xs">{icon}</Icon> <Text fontSize="xs">{label}</Text>
        </RouterNavLink>
      ))}
    </HStack>
  )
}

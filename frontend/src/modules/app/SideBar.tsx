import React, { ReactElement } from 'react'
import { HStack, IconButton, Separator, Text, VStack } from '@chakra-ui/react'
import { LuArchive, LuSettings, LuUser2 } from 'react-icons/lu'
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
    icon: <LuArchive />,
  },
  {
    label: resources.portal.sideBar.profile,
    to: route.portal(),
    icon: <LuUser2 />,
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
    <VStack align="left" gap={0}>
      {sideBarItems.map(({ to, label, icon, ...rest }, index) => (
        <React.Fragment key={to}>
          <RouterNavLink
            variant="ghost"
            size="lg"
            justifyContent="start"
            to={to}
            {...rest}
            asChild
            letterSpacing={0.5}
          >
            {icon}
            <Text fontSize="md">{label}</Text>
          </RouterNavLink>
          {index !== sideBarItems.length - 1 && (
            <Separator borderColor="bg.muted" mx={1} w={'calc(100% - 8px)'} />
          )}
        </React.Fragment>
      ))}
    </VStack>
  ) : (
    <HStack align="top" justifyContent={'center'}>
      {sideBarItems.map(({ to, label, icon, ...rest }) => (
        <React.Fragment key={to}>
          <IconButton
            bg="bg.emphasized"
            variant="ghost"
            size="sm"
            justifyContent="center"
            px={2}
            _active={{ bg: 'gray.400' }}
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

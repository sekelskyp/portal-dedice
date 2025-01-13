import React, { ReactElement, useEffect } from 'react'
import {
  HStack,
  Icon,
  IconButton,
  Separator,
  Text,
  useBreakpoint,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'

import { RouterNavLink } from '@frontend/shared/navigation/atoms/RouterNavLink'

import { sideBarItems } from '../utils/sideBarItems'

export interface SideBarItem {
  label: string
  to: string
  icon?: ReactElement
}

export default function SideBar() {
  const breakpoint = useBreakpoint({ breakpoints: ['base', 'sm', 'lg'] })
  const isMobile = breakpoint === 'base'
  const isTablet = breakpoint === 'sm'
  const isDesktop = breakpoint === 'lg'
  const { open, onToggle, onClose, onOpen } = useDisclosure({
    defaultOpen: isDesktop,
  })

  useEffect(() => {
    if (isTablet || isDesktop) onClose()
    if (isDesktop) onOpen()
  }, [isMobile, isDesktop, isTablet, onClose, onOpen])

  return !isMobile ? (
    <VStack
      align="left"
      gap={0}
      bg="bg.panel"
      border="1px solid"
      borderColor="bg.muted"
      borderRadius="md"
      boxShadow="card"
      p={2}
    >
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
            gap={6}
            px={4}
          >
            {icon}
            {open && label}
          </RouterNavLink>
          {index !== sideBarItems.length - 1 && (
            <Separator borderColor="bg.muted" mx={1} w={'calc(100% - 8px)'} />
          )}
        </React.Fragment>
      ))}
      <HStack alignSelf="end" mt={2} w="full">
        <IconButton
          variant="ghost"
          size="2xs"
          onClick={onToggle}
          w="full"
          color="fg.subtle"
        >
          {open ? <ChevronsLeft /> : <ChevronsRight />}
        </IconButton>
      </HStack>
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

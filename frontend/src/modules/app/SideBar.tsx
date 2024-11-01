import {
  Box,
  HStack,
  IconButton,
  Separator,
  Text,
  VStack,
} from '@chakra-ui/react'
import {
  LuArchive,
  LuFolderPlus,
  LuPlus,
  LuSettings,
  LuUser2,
} from 'react-icons/lu'

import { route } from '@frontend/route'
import { RouterNavLink } from '@frontend/shared/navigation/atoms/RouterNavLink'
import { NavItem } from '@frontend/shared/navigation/organisms/TopNavigation'

const navItems: NavItem[] = [
  {
    label: 'Můj profil',
    to: route.guide(),
  },
  {
    label: 'Nové řízení',
    to: route.about(),
  },
  {
    label: 'Nastavení',
    to: route.blog(),
  },
]

export default function SideBar() {
  return (
    <Box>
      <VStack align="left">
        <IconButton variant="ghost" size="lg" justifyContent="start" px={4}>
          <LuUser2></LuUser2>
          <Text>Profil</Text>
        </IconButton>
        <Separator size="md" />
        <IconButton variant="ghost" size="lg" justifyContent="start" px={4}>
          <LuArchive></LuArchive>
          Moje řízení
        </IconButton>
        <Separator size="md" />
        <IconButton variant="ghost" size="lg" justifyContent="start" px={4}>
          <LuFolderPlus></LuFolderPlus>
          <RouterNavLink
            variant={'ghost'}
            to={route.newProceeding()}
            key={`route-${route.newProceeding()}`}
            fontSize={'md'}
          >
            Nové řízení
          </RouterNavLink>
        </IconButton>
        <Separator size="md" />
        <IconButton variant="ghost" size="lg" justifyContent="start" px={4}>
          <LuSettings></LuSettings>
          Nastavení
        </IconButton>
        <Separator size="md" />
      </VStack>
    </Box>
  )
}

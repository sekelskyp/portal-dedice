import { Box, HStack, IconButton, Separator, Text, VStack } from '@chakra-ui/react'
import {
  LuArchive,
  LuFolderPlus,
  LuPlus,
  LuSettings,
  LuUser2,
} from 'react-icons/lu'

export default function SideBar() {
  return (
    <Box>
      <VStack align="left">
        <IconButton variant="ghost" size="lg" justifyContent="start" px={4}>
          <LuUser2></LuUser2>
          <Text>Profil</Text>
        </IconButton>
        <Separator size="md"/>
        <IconButton variant="ghost" size="lg" justifyContent="start" px={4}> 
          <LuArchive></LuArchive>
          Moje řízení
        </IconButton>
        <Separator size="md"/>
        <IconButton variant="ghost" size="lg" justifyContent="start" px={4}>
          <LuFolderPlus></LuFolderPlus>
          Nové řízení
        </IconButton>
        <Separator size="md"/>
        <IconButton variant="ghost" size="lg" justifyContent="start" px={4}>
          <LuSettings></LuSettings>
          Nastavení
        </IconButton>
        <Separator size="md"/>
      </VStack>
    </Box>
  )
}

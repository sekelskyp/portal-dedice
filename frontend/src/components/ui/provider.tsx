'use client'

import { ChakraProvider } from '@chakra-ui/react'

import { system } from '@src/theme/theme'

import { ColorModeProvider } from '@components/ui/color-mode'

export function Provider(props: React.PropsWithChildren) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>{props.children}</ColorModeProvider>
    </ChakraProvider>
  )
}

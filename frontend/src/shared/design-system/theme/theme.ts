import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

import { buttonRecipe } from './Button'
import { colors } from './Colors'

const customConfig = defineConfig({
  theme: {
    tokens: {
      fonts: {
        body: { value: 'Inter, sans-serif' },
        heading: { value: 'Inter, sans-serif' },
      },
      colors,
    },
    semanticTokens: {
      colors: {
        blue: {
          bg: {
            value: {
              _light: '{colors.blue.100/25}',
              _dark: '{colors.blue.900/25}',
            },
          },
        },
      },
    },
    recipes: {
      button: buttonRecipe,
    },
  },
})

export const system = createSystem(defaultConfig, customConfig)

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
        fg: {
          DEFAULT: {
            value: {
              _light: '{colors.primary.900}',
              _dark: '{colors.gray.300}',
            },
          },
          error: {
            value: {
              _light: '{colors.red.500}',
              _dark: '{colors.red.400}',
            },
          },
        },
        gray: {
          fg: {
            value: {
              _light: '{colors.gray.800}',
              _dark: '{colors.gray.300}',
            },
          },
        },
        bg: {
          DEFAULT: {
            value: {
              _light: '{colors.gray.50}',
              _dark: '{colors.gray.900}',
            },
          },
          muted: {
            value: {
              _light: '{colors.gray.100}',
              _dark: '{colors.gray.800}',
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

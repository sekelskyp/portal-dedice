import { defineRecipe } from '@chakra-ui/react'

export const buttonRecipe = defineRecipe({
  variants: {
    variant: {
      solid: { bg: { _light: 'primary.500', _dark: 'primary.300' } },
      ghost: {
        bg: 'transparent',
      },
    },
  },
})

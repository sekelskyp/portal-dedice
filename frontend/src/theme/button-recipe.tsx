import { defineRecipe } from '@chakra-ui/react'

export const buttonRecipe = defineRecipe({
  base: {
    transition: 'background 0.2s ease-in-out',
  },
  variants: {
    variant: {
      solid: {
        bg: { _light: 'primary.500', _dark: 'primary.300' },
        _hover: { bg: { _light: 'primary.600', _dark: 'primary.400' } },
      },
      ghost: {
        bg: 'transparent',
      },
    },
  },
})

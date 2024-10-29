import { defineRecipe } from '@chakra-ui/react'

export const buttonRecipe = defineRecipe({
  variants: {
    variant: {
      solid: { bg: 'primary.500' },
      ghost: {
        bg: 'transparent',
      },
    },
  },
})

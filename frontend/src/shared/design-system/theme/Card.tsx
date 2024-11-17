import { defineSlotRecipe } from '@chakra-ui/react'
import { cardAnatomy } from '@chakra-ui/react/anatomy'

export const cardSlotRecipe = defineSlotRecipe({
  slots: cardAnatomy.keys(),
  base: {
    header: {
      pt: { base: 4, sm: 6 },
      px: { base: 4, sm: 6 },
    },
    body: {
      p: { base: 4, sm: 6 },
    },
  },
  defaultVariants: {
    visual: 'subtle',
  },
  variants: {
    visual: {
      subtle: {
        root: {
          bg: 'bg.panel',
          borderColor: 'bg.panel',
        },
      },
    },
  },
})

import { Accordion } from '@chakra-ui/react'

import {
  AccordionHelperItem,
  AccordionHelperItemProps,
} from './AccordionHelperItem'

interface AccordionHelperProps {
  items: AccordionHelperItemProps[]
}

export function AccordionHelper({ items }: AccordionHelperProps) {
  return (
    <Accordion allowMultiple py={4} textAlign="left">
      {items.map((item) => (
        <AccordionHelperItem key={item.title} {...item} />
      ))}
    </Accordion>
  )
}

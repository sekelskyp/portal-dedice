import { AccordionRoot } from '@frontend/shared/design-system'

import {
  AccordionHelperItem,
  AccordionHelperItemProps,
} from './AccordionHelperItem'

interface AccordionHelperProps {
  items: AccordionHelperItemProps[]
}

export function AccordionHelper({ items }: AccordionHelperProps) {
  return (
    <AccordionRoot multiple textAlign="left">
      {items.map((item) => (
        <AccordionHelperItem key={item.title} {...item} />
      ))}
    </AccordionRoot>
  )
}

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '@frontend/shared/design-system'

interface AccordionHelperProps {
  items: {
    title: string
    description: string
  }[]
}

export function AccordionHelper({ items }: AccordionHelperProps) {
  return (
    <AccordionRoot
      multiple
      textAlign="left"
      variant="enclosed"
      borderRadius="lg"
    >
      {items.map((item) => (
        <AccordionItem key={item.title} value={item.title}>
          <AccordionItemTrigger>{item.title}</AccordionItemTrigger>
          <AccordionItemContent>{item.description}</AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  )
}

import { Box, Container, Heading, Stack } from '@chakra-ui/react'

import { AccordionHelper } from './accordion/AccordionHelper'

export type WizardStepxProps = {
  heading: string
  progress: number
  questions?: { title: string; description: string }[]
}

export function QuestionStep({
  heading,
  progress,
  questions = [],
}: WizardStepxProps) {
  return (
    <Box>
      <Stack spacing={4} alignItems="center">
        <Container maxWidth="container.sm">
          <Heading as={'h3'} size="lg" py={6} px={12} textAlign={'center'}>
            {heading}
          </Heading>
          <AccordionHelper items={questions} />
        </Container>
        <Stack direction={'row'}>{progress}...</Stack>
      </Stack>
    </Box>
  )
}

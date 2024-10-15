import { Box, Container, Heading, Stack } from '@chakra-ui/react'

export type WizardStepxProps = {
  heading: string
  progress: number
}

export function QuestionStep({ heading, progress }: WizardStepxProps) {
  return (
    <Box>
      <Stack spacing={4} alignItems="center">
        <Container maxWidth="container.sm">
          <Heading as={'h3'} size="lg" py={6} px={12} textAlign={'center'}>
            {heading}: Otázka: {progress}%
          </Heading>
        </Container>
        <Stack direction={'row'}>{progress}...</Stack>
      </Stack>
    </Box>
  )
}

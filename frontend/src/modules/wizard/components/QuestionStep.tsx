import { Box, Button, Container, Heading, Stack } from '@chakra-ui/react'

import { AccordionHelper } from './accordion/AccordionHelper'

export type WizardStepxProps = {
  questionsProgress: number
  heading: string
  progress: number
  questions?: { title: string; description: string }[]
  nextStep: () => void
  previousStep: () => void
  button: string
}

export function QuestionStep({
  questionsProgress,
  heading,
  progress,
  questions = [],
  nextStep,
  previousStep,
  button,
}: WizardStepxProps) {
  return (
    <Box>
      <Stack gap={4} direction={{ base: 'column', md: 'column', lg: 'row' }}>
        <Container
          alignContent={'center'}
          maxWidth={{ base: '95%', lg: '50%' }}
          bg="bg.panel"
          borderRadius="xl"
        >
          <Heading
            size={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' }}
            py={{ base: 2, sm: 6 }}
            px={{ base: 4, sm: 10 }}
            textAlign="left"
          >
            {heading}
          </Heading>
        </Container>
        {questions.length > 0 && (
          <>
            <Container maxWidth={{ base: '90%', lg: '50%' }}>
              <AccordionHelper items={questions} />
            </Container>
          </>
        )}
      </Stack>
      {questionsProgress !== 0 && (
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          pt={4}
          mt={4}
          justifyContent="space-between"
        >
          <Button
            bg="gray.500"
            onClick={previousStep}
            order={{ base: 2, sm: 1 }}
            fontSize={{ base: 'sm', sm: 'md' }}
            size={{ base: 'sm', sm: 'lg' }}
          >
            Zpět
          </Button>
          <Button
            onClick={nextStep}
            order={{ base: 1, sm: 2 }}
            fontSize={{ base: 'sm', sm: 'md' }}
            size={{ base: 'sm', sm: 'lg' }}
          >
            {button}
          </Button>
        </Stack>
      )}
    </Box>
  )
}

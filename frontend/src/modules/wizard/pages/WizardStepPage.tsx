import { Box, Button, Text } from '@chakra-ui/react'

import { NotaryAssignment } from '../components/NotaryAssignment'
import { QuestionStep } from '../components/QuestionStep'
import { StepperProgress } from '../components/StepperProgress'
import { TestatorIdentification } from '../components/TestatorIdentification'
import { useWizardSteps } from '../hooks/useWizardSteps'

export function WizardPage() {
  const { step, questionsProgress, treeProgress, nextStep, previousStep } =
    useWizardSteps()

  const data = [
    {
      id: 1,
      heading: 'Question 1',
    },
    {
      id: 2,
      heading: 'Question 2',
    },
    {
      id: 3,
      heading: 'Question 3',
    },
    {
      id: 4,
      heading: 'Question 4',
    },
    {
      id: 5,
      heading: 'Question 5',
    },
    {
      id: 6,
      heading: 'Question 6',
    },
    {
      id: 7,
      heading: 'Question 7',
    },
    {
      id: 8,
      heading: 'Question 8',
    },
    {
      id: 9,
      heading: 'Question 9',
    },
    {
      id: 10,
      heading: 'Question 10',
    },
  ]

  return (
    <Box width="60%" mx="auto" mt="4">
      <StepperProgress
        step={step}
        questionsProgress={questionsProgress}
        treeProgress={treeProgress}
      />
      <Box textAlign="center" mb="8">
        {step === 1 && (
          <Box>
            <Text fontSize="lg">Identifikace zůstavitele (Step 1)</Text>
            <TestatorIdentification nextStep={nextStep} />
          </Box>
        )}
        {step === 2 && (
          <Box>
            <Text fontSize="lg">Vyhledání notáře (Step 2)</Text>
            {questionsProgress === 0 ? (
              <NotaryAssignment />
            ) : (
              <QuestionStep
                progress={questionsProgress}
                heading={data[questionsProgress / 10].heading}
              />
            )}
          </Box>
        )}
        {step === 3 && <Text fontSize="lg">Průvodce řízením (Step 3)</Text>}
        {step === 4 && (
          <Text fontSize="lg">Konec, tady máte výsledek nachytřovadla.</Text>
        )}
      </Box>
      <Box display="flex" justifyContent="space-between" mt="8">
        <Button onClick={previousStep} isDisabled={step === 1}>
          Previous
        </Button>
        <Button onClick={nextStep} isDisabled={step === 4}>
          Next
        </Button>
      </Box>
    </Box>
  )
}

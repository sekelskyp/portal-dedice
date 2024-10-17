import { Box, Button, Heading } from '@chakra-ui/react'

import { NotaryAssignment } from '../components/NotaryAssignment'
import Questionnaire from '../components/Questionarrie'
import { QuestionStep } from '../components/QuestionStep'
import { StepperProgress } from '../components/stepper/StepperProgress'
import { TestatorIdentification } from '../components/TestatorIdentification'
import { useWizardSteps } from '../hooks/useWizardSteps'
import questionData from '../questions.json'

export function WizardPage() {
  const {
    step,
    questionsProgress,
    treeProgress,
    setNextStep,
    setPreviousStep,
  } = useWizardSteps()

  const data = questionData

  function StepperHeading({ text }: { text: string }) {
    return (
      <Heading size={{ base: 'md', sm: 'lg', md: 'xl', lg: '2xl' }} pb={6}>
        {text}
      </Heading>
    )
  }

  return (
    <Box width={{ base: '85%', md: '60%' }} mx="auto" mt="4">
      <StepperProgress
        step={step}
        questionsProgress={questionsProgress}
        treeProgress={treeProgress}
      />
      <Box textAlign="center" mb="8">
        {step === 1 && (
          <Box>
            <StepperHeading text="Identifikace zůstavitele" />
            <TestatorIdentification nextStep={setNextStep} />
          </Box>
        )}
        {step === 2 && (
          <Box>
            <StepperHeading
              text={
                questionsProgress === 0
                  ? 'Přiřazení notáře'
                  : `Průvodce pozůstalostním řízením (${questionsProgress / 10}/10)`
              }
            />
            {questionsProgress === 0 ? (
              <NotaryAssignment />
            ) : (
              <QuestionStep
                progress={questionsProgress}
                heading={data[questionsProgress / 10].heading}
                questions={data[questionsProgress / 10].question}
              />
            )}
            <Box display="flex" justifyContent="space-between" mt="8" mb="8">
              <Button onClick={setPreviousStep}>Zpět</Button>
              <Button onClick={setNextStep}>
                {data[questionsProgress / 10].button}
              </Button>
            </Box>
          </Box>
        )}

        {step === 3 && (
          <Box>
            <StepperHeading text="Rozhodovací strom..." />
            <Questionnaire />
          </Box>
        )}
        {step === 4 && <StepperHeading text="Výstup nachytřovadla..." />}
      </Box>
    </Box>
  )
}

import { Box, Heading } from '@chakra-ui/react'

import { NotaryAssignment } from '../components/NotaryAssignment'
import { QuestionnaireStep } from '../components/Questionarrie'
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
    <Box width={{ base: '85%', md: '60%' }} mx="auto" mt="8">
      <StepperProgress
        step={step}
        questionsProgress={questionsProgress}
        treeProgress={treeProgress}
      />
      <Box textAlign="center" my="8">
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
              <NotaryAssignment
                nextStep={setNextStep}
                previousStep={setPreviousStep}
              />
            ) : (
              <QuestionStep
                progress={questionsProgress}
                heading={data[questionsProgress / 10].heading}
                questions={data[questionsProgress / 10].question}
                button={data[questionsProgress / 10].button}
                nextStep={setNextStep}
                previousStep={setPreviousStep}
                questionsProgress={questionsProgress}
              />
            )}
          </Box>
        )}
        {step === 3 && (
          <Box>
            <StepperHeading text="Rozhodovací strom" />
            <QuestionnaireStep />
          </Box>
        )}
        {step === 4 && <StepperHeading text="Výstup nachytřovadla..." />}
      </Box>
    </Box>
  )
}

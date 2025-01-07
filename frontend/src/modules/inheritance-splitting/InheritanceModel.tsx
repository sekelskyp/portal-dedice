import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Form } from '@frontend/shared/forms/Form'

import { StepLayout } from './components/StepLayout'
import { FormData } from './FormData'
import { StepFour } from './StepFour'
import { StepOne } from './StepOne'
import { StepThree } from './StepThree'
import { StepTwo } from './StepTwo'
import { WizardProvider } from './WizardContext'

const InheritanceModel = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const methods = useForm<FormData>({
    defaultValues: {
      hasChildren: '',
      childrenCount: '',
      hasSpouse: '',
      hasParents: '',
      hasSiblings: '',
      siblingsCount: '',
      assets: [],
      heirs: [],
    },
    mode: 'onChange',
  })

  const formData = methods.watch()

  const onSubmit = (data: FormData) => {
    if (currentStep === 4) {
      console.log('Final submission:', data)
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleNext = () => {
    methods.handleSubmit(onSubmit)()
  }

  return (
    <WizardProvider
      value={{
        formData,
        currentStep,
        setCurrentStep,
        formMethods: methods,
      }}
    >
      <FormProvider {...methods}>
        <Form onSubmit={onSubmit}>
          {currentStep === 1 && (
            <StepLayout
              title="Modelace vypořádání pozůstalosti"
              description="Tento nástroj slouží jako pomoc při přípravě na pozůstalostní řízení. Jedná se o modelaci vypořádání majetku v pozůstalosti dle zákonné posloupnosti. Nástroj není perfektní, ale pomůže Vám pochopit principy uvedené v zákoně. V případě, kdy je v pozůstalostním řízení závěť se zákonná posloupnost (tato modelace) pravděpodobně neuplatní. V každém případě Vás čeká schůzka s určeným notářem, který Vás konkrétním pozůstalostním řízením provede do detailu.
Vložené informace a data se nijak neukládají ani nezaznamenávají."
            >
              <StepOne onPrevious={handlePrevious} onNext={handleNext} />
            </StepLayout>
          )}
          {currentStep === 2 && (
            <StepLayout
              title="Soupis majetku"
              description="Zadejte jednotlivé položky majetku zůstavitele"
            >
              <StepTwo onPrevious={handlePrevious} onNext={handleNext} />
            </StepLayout>
          )}
          {currentStep === 3 && (
            <StepLayout
              title="Návrh rozdělení"
              description="Navrhněte rozdělení majetku mezi dědice"
            >
              <StepThree onPrevious={handlePrevious} onNext={handleNext} />
            </StepLayout>
          )}
          {currentStep === 4 && (
            <StepLayout
              title="Výsledek dědického řízení"
              description="Přehled rozdělení majetku mezi dědice"
            >
              <StepFour onPrevious={handlePrevious} onNext={handleNext} />
            </StepLayout>
          )}
        </Form>
      </FormProvider>
    </WizardProvider>
  )
}

export default InheritanceModel

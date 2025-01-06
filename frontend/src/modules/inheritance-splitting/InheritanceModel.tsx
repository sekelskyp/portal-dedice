import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Form } from '@frontend/shared/forms/Form'

import { StepLayout } from './components/StepLayout'
import { FormData } from './FormData'
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

  useEffect(() => {
    const subscription = methods.watch((formData) => {
      const newHeirs: {
        id: string
        type: 'spouse' | 'child' | 'parent' | 'sibling'
        label: string
      }[] = []

      if (formData.hasSpouse === 'yes') {
        newHeirs.push({
          id: 'spouse',
          type: 'spouse',
          label: 'Manžel/ka',
        })
      }

      const childCount = formData.childrenCount
        ? parseInt(String(formData.childrenCount), 10)
        : 0
      if (formData.hasChildren === 'yes' && childCount > 0) {
        for (let i = 1; i <= childCount; i++) {
          newHeirs.push({
            id: `child${i}`,
            type: 'child',
            label: `Dítě ${i}`,
          })
        }
      }

      if (
        JSON.stringify(newHeirs) !== JSON.stringify(methods.getValues('heirs'))
      ) {
        methods.setValue('heirs', newHeirs, { shouldValidate: true })
      }
    })

    return () => subscription.unsubscribe()
  }, [methods])

  const onSubmit = (data: FormData) => {
    if (currentStep === 3) {
      console.log(data)
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1)
  }

  return (
    <WizardProvider
      value={{
        formData: methods.getValues(),
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
        </Form>
      </FormProvider>
    </WizardProvider>
  )
}

export default InheritanceModel

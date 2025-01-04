import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { FormProvider, useForm } from 'react-hook-form'

import { Form } from '@frontend/shared/forms/Form'

import { StepOne } from './StepOne'
import { StepThree } from './StepThree'
import { StepTwo } from './StepTwo'

interface FormData {
  childrenCount: string
  hasChildren: string
  hasSpouse: string
  hasParents: string
  hasSiblings: string
  siblingsCount: string
  assets: string[]
  heirs: string[]
}

const InheritanceModel = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const methods = useForm<FormData>({
    defaultValues: {
      hasChildren: '',
      childrenCount: '',
      hasSpouse: '',
      assets: [],
      heirs: [],
    },
  })

  useEffect(() => {
    const subscription = methods.watch((formData) => {
      const newHeirs: string[] = []

      if (formData.hasSpouse === 'yes') {
        newHeirs.push('spouse')
      }

      const childCount = formData.childrenCount
        ? parseInt(String(formData.childrenCount), 10)
        : 0
      if (formData.hasChildren === 'yes' && childCount > 0) {
        for (let i = 1; i <= childCount; i++) {
          newHeirs.push(`child${i}`)
        }
      }

      if (
        JSON.stringify(newHeirs) !== JSON.stringify(methods.getValues('heirs'))
      ) {
        methods.setValue('heirs', newHeirs, { shouldValidate: true })
      }
    })

    return () => subscription.unsubscribe()
  })

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
    <FormProvider {...methods}>
      <Form onSubmit={onSubmit}>
        <Box p={6}>
          {currentStep === 1 && (
            <StepOne onPrevious={handlePrevious} onNext={handleNext} />
          )}
          {currentStep === 2 && (
            <StepTwo onPrevious={handlePrevious} onNext={handleNext} />
          )}
          {currentStep === 3 && (
            <StepThree onPrevious={handlePrevious} onNext={handleNext} />
          )}
        </Box>
      </Form>
    </FormProvider>
  )
}

export default InheritanceModel

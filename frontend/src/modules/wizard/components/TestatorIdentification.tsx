import { Flex, Heading, Spacer, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import {
  InputControl,
  SelectControl,
  SubmitButton,
} from 'react-hook-form-chakra'
import { z } from 'zod'

const schema = z.object({
  sex: z.string().min(1, 'Pohlaví je povinné'),
  birthDate: z.string().min(1, 'Datum narození je povinné'),
  address: z.string().min(1, 'Adresa bydliště je povinná'),
})

type NextStepProps = {
  nextStep: () => void
}

export function TestatorIdentification({ nextStep }: NextStepProps) {
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  const onSubmit = (data: z.infer<typeof schema>) => {
    nextStep()
  }

  return (
    <FormProvider {...methods}>
      <Flex
        direction={'column'}
        gap={5}
        as="form"
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
      >
        <Heading as={'h3'} size="lg">
          Identifikace zůstavitele
        </Heading>
        <Text fontSize="lg">
          Vyplněním formuláře Vám pomůžeme zjistit, který notář bude spravovat
          Vaše pozůstalostní řízení
        </Text>
        <SelectControl
          name="sex"
          label="Pohlaví"
          selectProps={{ placeholder: 'Zvolte pohlaví' }}
        >
          <option value="male">Muž</option>
          <option value="female">Žena</option>
        </SelectControl>
        <InputControl
          name="birthDate"
          label="Datum narození"
          inputProps={{ type: 'date' }}
          isRequired
        ></InputControl>
        <InputControl
          name="address"
          label="Trvalé bydliště"
          isRequired
        ></InputControl>
        <Spacer></Spacer>
        <SubmitButton>Kdo bude můj notář?</SubmitButton>
      </Flex>
    </FormProvider>
  )
}

import { Box, Container, Spacer, Stack, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  InputControl,
  SelectControl,
  SubmitButton,
} from 'react-hook-form-chakra'
import { z } from 'zod'

import { Form } from '../../../shared/forms/Form'

const schema = z.object({
  sex: z.string().min(1, 'Pohlaví je povinné'),
  birthDate: z.string().min(1, 'Datum narození je povinné'),
  address: z.string().min(1, 'Adresa bydliště je povinná'),
})

type NextStepProps = {
  nextStep: () => void
}

export function TestatorIdentification({ nextStep }: NextStepProps) {
  const onSubmit = (data: z.infer<typeof schema>) => {
    nextStep()
  }

  return (
    <Form onSubmit={onSubmit} resolver={zodResolver(schema)} noValidate>
      <Container maxW="container.xl" width="100%" px={16} py={8}>
        <Stack gap={5}>
          <Text fontSize="lg">
            Vyplněním formuláře Vám pomůžeme zjistit, který notář bude spravovat
            Vaše pozůstalostní řízení.
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
          <Box>
            <SubmitButton>Kdo bude můj notář?</SubmitButton>
          </Box>
        </Stack>
      </Container>
    </Form>
  )
}

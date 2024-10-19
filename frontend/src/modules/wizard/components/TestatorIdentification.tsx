import { Box, Container, Radio, Spacer, Stack, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  InputControl,
  RadioGroupControl,
  SubmitButton,
} from 'react-hook-form-chakra'
import { z } from 'zod'

import { Form } from '../../../shared/forms/Form'

const schema = z.object({
  sex: z.string().min(1, 'Pohlaví je povinné.'),
  birthDate: z.string().min(1, 'Datum narození je povinné.'),
  address: z.string().min(1, 'Adresa bydliště je povinná.'),
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
      <Container
        maxW="container.xl"
        width="100%"
        px={{ base: 4, sm: 8, md: 12, lg: 16 }}
        py={{ base: 2, sm: 4 }}
      >
        <Text fontSize={{ base: 'sm', sm: 'md', md: 'lg' }} pb={4}>
          Vyplněním formuláře údaji zůstavitele Vám pomůžeme zjistit, který
          notář bude spravovat Vaše pozůstalostní řízení.
        </Text>
        <Stack
          gap={5}
          p={8}
          borderWidth="2px"
          borderColor="gray.100"
          borderRadius="xl"
        >
          <RadioGroupControl
            name="sex"
            label="Pohlaví"
            labelProps={{ fontSize: { base: 'sm', md: 'md' } }}
            isRequired
          >
            <Stack direction="row" spacing={5}>
              <Radio value="male" size={{ base: 'sm', md: 'md' }}>
                Muž
              </Radio>
              <Radio value="female" size={{ base: 'sm', md: 'md' }}>
                Žena
              </Radio>
            </Stack>
          </RadioGroupControl>
          <InputControl
            name="birthDate"
            label="Datum narození"
            labelProps={{ fontSize: { base: 'sm', md: 'md' } }}
            inputProps={{ type: 'date', fontSize: { base: 'sm', md: 'md' } }}
            isRequired
          ></InputControl>
          <InputControl
            name="address"
            label="Trvalé bydliště"
            labelProps={{ fontSize: { base: 'sm', md: 'md' } }}
            inputProps={{ fontSize: { base: 'sm', md: 'md' } }}
            isRequired
          ></InputControl>
          <Spacer></Spacer>
          <Box>
            <SubmitButton>Potvrdit údaje</SubmitButton>
          </Box>
        </Stack>
      </Container>
    </Form>
  )
}

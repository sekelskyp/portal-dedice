import {
  Card,
  createListCollection,
  Fieldset,
  HStack,
  Input,
  Stack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useAuth } from '@frontend/modules/auth'
import resources from '@frontend/resources'
import { Field } from '@frontend/shared/design-system'
import {
  AddressGroupFormControl,
  DateFormControl,
  Form,
  InputFormControl,
  SelectFormControl,
  SubmitButton,
} from '@frontend/shared/forms'

import { useGetUsers } from '../hooks/useGetUsers'

export type ProceedingFormProps = {
  errorMessage?: string
  onSubmit: (variables: {
    name: string
    surname: string
    dateOfBirth: string
    dateOfDeath: string
    addressInput: {
      street: string
      streetNumber: string
      municipality: string
      postalCode: string
    }
    mainBeneficiary: string
    beneficiaries: string[]
  }) => void
}

export function ProceedingForm({ onSubmit }: ProceedingFormProps) {
  const { user } = useAuth()
  const { data } = useGetUsers({ type: 'User' })

  const otherUsers = createListCollection({
    items:
      data?.getAllUserByType
        ?.filter((u) => u.id !== user?.id)
        .map((user) => ({
          label: `${user.name} ${user.surname}`,
          value: user.id,
        })) || [],
  })

  const addressSchema = z.object({
    street: z.string().min(1, 'Ulice je povinná'),
    streetNumber: z.string().min(1, 'Číslo popisné je povinné'),
    municipality: z.string().min(1, 'Obec je povinná'),
    postalCode: z.string().min(1, 'PSČ je povinné'),
  })

  const schema = z
    .object({
      name: z
        .string({ required_error: 'Jméno je povinné' })
        .min(1, 'Jméno je povinné'),
      surname: z
        .string({ required_error: 'Příjmení je povinné' })
        .min(1, 'Příjmení je povinné'),
      dateOfBirth: z
        .date({ required_error: 'Datum narození je povinné.' })
        .max(new Date(), 'Datum narození musí být v minulosti.'),
      dateOfDeath: z
        .date({ required_error: 'Datum úmrtí je povinné.' })
        .max(new Date(), 'Datum úmrtí musí být v minulosti.'),
      beneficiaries: z.array(z.string()),
      addressInput: addressSchema,
      mainBeneficiary: z.string({ required_error: 'Hlavní dědic je povinný.' }),
    })
    .refine((data) => data.dateOfBirth < data.dateOfDeath, {
      message: 'Datum úmrtí musí být po datumu narození.',
    })
    .refine((data) => !data.beneficiaries.includes(data.mainBeneficiary), {
      message: 'Hlavní dědic nemůže být zároveň v seznamu dalších dědiců.',
      path: ['beneficiaries'],
    })

  return (
    <Form
      onSubmit={onSubmit}
      resolver={zodResolver(schema)}
      noValidate
      defaultValues={{
        beneficiaries: [],
      }}
    >
      <Stack gap={6}>
        <Fieldset.Root size="lg">
          <Stack>
            <Fieldset.Legend>
              {resources.portal.forms.proceedingForm.groups.deceased}
            </Fieldset.Legend>
            <Fieldset.HelperText>
              {resources.portal.forms.proceedingForm.groups.deceasedHelper}
            </Fieldset.HelperText>
          </Stack>
          <Fieldset.Content>
            <Stack direction={{ base: 'column', sm: 'row' }} gap={4}>
              <InputFormControl
                name="name"
                label={resources.portal.forms.proceedingForm.name}
                required
              ></InputFormControl>
              <InputFormControl
                name="surname"
                label={resources.portal.forms.proceedingForm.surname}
                required
              ></InputFormControl>
            </Stack>
            <Stack direction={{ base: 'column', sm: 'row' }} gap={4}>
              <DateFormControl
                name="dateOfBirth"
                label={resources.portal.forms.proceedingForm.dateOfBirth}
                required
              ></DateFormControl>
              <DateFormControl
                name="dateOfDeath"
                label={resources.portal.forms.proceedingForm.dateOfDeath}
                required
              ></DateFormControl>
            </Stack>
            <AddressGroupFormControl
              required
              label={resources.portal.forms.proceedingForm.address}
            />
          </Fieldset.Content>
        </Fieldset.Root>
        <Fieldset.Root size="lg">
          <Stack>
            <Fieldset.Legend>
              {resources.portal.forms.proceedingForm.groups.contactPerson}
            </Fieldset.Legend>
            <Fieldset.HelperText>
              {resources.portal.forms.proceedingForm.groups.contactPersonHelper}
            </Fieldset.HelperText>
          </Stack>
          <Fieldset.Content>
            <SelectFormControl
              name="mainBeneficiary"
              collection={otherUsers}
              label="Hlavní kontaktní osoba"
              clearable
              required
            />
          </Fieldset.Content>
        </Fieldset.Root>
        <Fieldset.Root size="lg">
          <Stack>
            <Fieldset.Legend>
              {resources.portal.forms.proceedingForm.groups.beneficiaries}
            </Fieldset.Legend>
            <Fieldset.HelperText>
              {resources.portal.forms.proceedingForm.groups.beneficiariesHelper}
            </Fieldset.HelperText>
          </Stack>
          <Fieldset.Content>
            <Card.Root bg="blackAlpha.100" size="sm">
              <Card.Header color="fg.subtle">Dědic (Vy)</Card.Header>
              <Card.Body as={Stack}>
                <HStack gap={4}>
                  <Field
                    label={resources.portal.forms.proceedingForm.name}
                    disabled
                  >
                    <Input value={user?.name} />
                  </Field>

                  <Field
                    label={resources.portal.forms.proceedingForm.surname}
                    disabled
                  >
                    <Input value={user?.surname} />
                  </Field>
                </HStack>
                <Field
                  label={resources.portal.forms.proceedingForm.email}
                  disabled
                >
                  <Input value={user?.email} />
                </Field>
              </Card.Body>
            </Card.Root>
          </Fieldset.Content>
          <Fieldset.Content>
            <SelectFormControl
              name="beneficiaries"
              collection={otherUsers}
              label="Další dědicové"
              multiple
            />
          </Fieldset.Content>
        </Fieldset.Root>
        <SubmitButton alignSelf="center">
          {resources.portal.forms.proceedingForm.createProceeding}
        </SubmitButton>
      </Stack>
    </Form>
  )
}

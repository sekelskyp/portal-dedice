import {
  Card,
  Fieldset,
  Grid,
  HStack,
  IconButton,
  Input,
  Stack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray } from 'react-hook-form'
import { LuPlus, LuTrash2 } from 'react-icons/lu'
import { z } from 'zod'

import { useAuth } from '@frontend/modules/auth'
import resources from '@frontend/resources'
import { Field } from '@frontend/shared/design-system'
import {
  AddressGroupFormControl,
  DateFormControl,
  Form,
  InputFormControl,
  SubmitButton,
} from '@frontend/shared/forms'

import useValidateUser from '../hooks/useValidateUser'

const benefciarySchema = z.object({
  name: z
    .string({ required_error: 'Jméno je povinné' })
    .min(1, 'Jméno je povinné'),
  surname: z
    .string({ required_error: 'Příjmení je povinné' })
    .min(1, 'Příjmení je povinné'),
  email: z
    .string({ required_error: 'Zadejte validní e-mailovou adresu' })
    .email('Zadejte validní e-mailovou adresu'),
})
/*
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
      .date({ required_error: 'Datum narození je povinné.' })
      .max(new Date(), 'Datum narození musí být v minulosti.'),
    contactName: z
      .string({ required_error: 'Jméno je povinné' })
      .min(1, 'Jméno je povinné'),
    contactSurname: z
      .string({ required_error: 'Jméno je povinné' })
      .min(1, 'Jméno je povinné'),
    contactEmail: z
      .string({ required_error: 'Zadejte validní e-mailovou adresu' })
      .email('Zadejte validní e-mailovou adresu')
      .refine(
        async (email: string) => {
          const result = await validate(email)
          return !!result
        },
        {
          message: 'Uživatel nebyl nalezen',
        }
      ),
    beneficiaries: z.array(benefciarySchema),
    addressStreet: z.string().min(1, 'Ulice je povinná.'),
    addressStreetNumber: z.string().min(1, 'Číslo popisné je povinné.'),
    addressMunicipality: z.string().min(1, 'Obec je povinná.'),
    addressPostCode: z.string().min(1, 'PSČ je povinné.'),
  })
  .refine((data) => data.dateOfBirth < data.dateOfDeath, {
    message: 'Datum úmrtí musí být po datumu narození',
  })
*/
export type ProceedingFormProps = {
  errorMessage?: string
  onSubmit: (variables: {
    name: string
    surname: string
    dateOfBirth: string
    dateOfDeath: string
    addressStreet: string
    addressStreetNumber: string
    addressMunicipality: string
    addressPostCode: string
    contactName: string
    contactSurname: string
    contactEmail: string
    beneficiaries: Beneficiary[]
  }) => void
}

export interface Beneficiary {
  name: string
  surname: string
  email: string
}

export function ProceedingForm({ onSubmit }: ProceedingFormProps) {
  const validate = useValidateUser()
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
        .date({ required_error: 'Datum narození je povinné.' })
        .max(new Date(), 'Datum narození musí být v minulosti.'),
      contactName: z
        .string({ required_error: 'Jméno je povinné' })
        .min(1, 'Jméno je povinné'),
      contactSurname: z
        .string({ required_error: 'Jméno je povinné' })
        .min(1, 'Jméno je povinné'),
      contactEmail: z
        .string({ required_error: 'Zadejte validní e-mailovou adresu' })
        .email('Zadejte validní e-mailovou adresu')
        .refine(
          async (email: string) => {
            const result = await validate(email)
            return !!result
          },
          {
            message: 'Uživatel nebyl nalezen',
          }
        ),
      beneficiaries: z.array(benefciarySchema),
      addressStreet: z.string().min(1, 'Ulice je povinná.'),
      addressStreetNumber: z.string().min(1, 'Číslo popisné je povinné.'),
      addressMunicipality: z.string().min(1, 'Obec je povinná.'),
      addressPostCode: z.string().min(1, 'PSČ je povinné.'),
    })
    .refine((data) => data.dateOfBirth < data.dateOfDeath, {
      message: 'Datum úmrtí musí být po datumu narození',
    })

  return (
    <Form
      onSubmit={onSubmit}
      resolver={zodResolver(schema)}
      noValidate
      defaultValues={{ beneficiaries: [] }}
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
            <Stack direction={{ base: 'column', sm: 'row' }} gap={6}>
              <InputFormControl
                name="contactName"
                label={resources.portal.forms.proceedingForm.name}
                required
              ></InputFormControl>
              <InputFormControl
                name="contactSurname"
                label={resources.portal.forms.proceedingForm.surname}
                required
              ></InputFormControl>
            </Stack>
            <InputFormControl
              name="contactEmail"
              label={resources.portal.forms.proceedingForm.email}
              required
            ></InputFormControl>
          </Fieldset.Content>
        </Fieldset.Root>
        <BeneficiarySection />
        <SubmitButton alignSelf="center">
          {resources.portal.forms.proceedingForm.createProceeding}
        </SubmitButton>
      </Stack>
    </Form>
  )
}

const BeneficiarySection = () => {
  const beneficiaries = useFieldArray({ name: 'beneficiaries' })
  const { user } = useAuth()

  return (
    <Fieldset.Root size="lg">
      <Stack>
        <Fieldset.Legend>
          {resources.portal.forms.proceedingForm.groups.beneficiaries}
        </Fieldset.Legend>
        <Fieldset.HelperText fontSize="xs">
          {resources.portal.forms.proceedingForm.groups.beneficiariesHelper}
        </Fieldset.HelperText>
      </Stack>

      <Fieldset.Content>
        <Grid gap={6} templateColumns={{ base: '1fr', xl: '1fr 1fr' }}>
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

          {beneficiaries.fields.map((field, index) => (
            <Card.Root key={field.id} bg="bg.muted" size="sm">
              <Card.Header>{`Dědic ${index + 1}`}</Card.Header>
              <Card.Body as={Stack}>
                <HStack gap={4}>
                  <InputFormControl
                    name={`beneficiaries.${index}.name`}
                    label={resources.portal.forms.proceedingForm.name}
                    required
                  ></InputFormControl>
                  <InputFormControl
                    name={`beneficiaries.${index}.surname`}
                    label={resources.portal.forms.proceedingForm.surname}
                    required
                  ></InputFormControl>
                </HStack>
                <HStack gap={4}>
                  <InputFormControl
                    name={`beneficiaries.${index}.email`}
                    label={resources.portal.forms.proceedingForm.email}
                    required
                  ></InputFormControl>
                  <IconButton
                    alignSelf="end"
                    onClick={() => beneficiaries.remove(index)}
                    p={4}
                    bg={{ base: 'red.500', _hover: 'red.600' }}
                  >
                    <LuTrash2 />
                    Odstranit
                  </IconButton>
                </HStack>
              </Card.Body>
            </Card.Root>
          ))}
        </Grid>
        <IconButton
          onClick={() =>
            beneficiaries.append({
              name: '',
              surname: '',
              email: '',
            })
          }
          alignSelf="flex-start"
          p={4}
        >
          <LuPlus></LuPlus>
          {resources.portal.forms.proceedingForm.addBeneficiary}
        </IconButton>
      </Fieldset.Content>
    </Fieldset.Root>
  )
}

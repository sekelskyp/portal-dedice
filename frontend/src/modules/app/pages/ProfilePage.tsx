import { useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Card, Heading, HStack, Stack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'

import { gql } from '@frontend/gql'
import { ProfileInput } from '@frontend/gql/graphql'
import { useAuth } from '@frontend/modules/auth'
import { Radio } from '@frontend/shared/design-system'
import {
  AddressGroupFormControl,
  Form,
  InputFormControl,
  RadioGroupFormControl,
  SubmitButton,
} from '@frontend/shared/forms'

const GET_PROFILE_QUERY = gql(/* GraphQL */ `
  query GetUserById($getUserByIdId: Float!) {
    getUserById(id: $getUserByIdId) {
      contact {
        addressMunicipality
        addressPostCode
        addressStreet
        addressStreetNumber
        name
        surname
        displayName
        email
        gender
        name
        phone
        surname
      }
    }
  }
`)

const UPDATE_PROFILE_MUTATION = gql(/* GraphQL */ `
  mutation UpdateProfile($profileInput: ProfileInput!) {
    updateProfile(profileInput: $profileInput) {
      contact {
        addressMunicipality
        addressPostCode
        addressStreet
        addressStreetNumber
        name
        surname
        displayName
        email
        gender
        name
        phone
        surname
      }
    }
  }
`)

export const ProfilePage = () => {
  const auth = useAuth()

  const { data, loading } = useQuery(GET_PROFILE_QUERY, {
    variables: { getUserByIdId: +auth.user!.id },
  })

  const [updateProfile] = useMutation(UPDATE_PROFILE_MUTATION)

  const onSubmit = (variables: ProfileInput) =>
    updateProfile({
      variables: { profileInput: variables },
    })

  return (
    <Card.Root variant="subtle">
      <Card.Header>
        <Heading size={{ base: 'xl', sm: '2xl' }}>Profil</Heading>
      </Card.Header>
      <Card.Body>
        <ProfileForm
          loading={loading}
          defaultValues={
            data?.getUserById?.contact ?? { name: '', surname: '' }
          }
          onSubmit={onSubmit}
        />
      </Card.Body>
    </Card.Root>
  )
}

const schema = z.object({
  name: z.string(),
  surname: z.string(),
  displayName: z.string(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  addressStreet: z.string().nullable(),
  addressStreetNumber: z.string().nullable(),
  addressMunicipality: z.string().nullable(),
  addressPostCode: z.string().nullable(),
})

const ProfileForm = ({
  loading,
  defaultValues,
  onSubmit,
}: {
  loading: boolean
  defaultValues: ProfileInput
  onSubmit: (variables: ProfileInput) => void
}) => {
  return (
    <Form
      onSubmit={onSubmit}
      resolver={zodResolver(schema)}
      loading={loading}
      defaultValues={defaultValues}
      noValidate
    >
      <Stack gap={4}>
        <NameGroupFormControl />
        <HStack gap={4}>
          <InputFormControl name="email" label="Email" />
          <InputFormControl name="phone" label="Telefon" />
        </HStack>
        <RadioGroupFormControl name="gender" label="Pohlaví">
          <Radio value="Male">Muž</Radio>
          <Radio value="Female">Žena</Radio>
        </RadioGroupFormControl>
        <AddressGroupFormControl label="Trvalé bydliště" />
        <SubmitButton alignSelf="end" px={8}>
          Uložit
        </SubmitButton>
      </Stack>
    </Form>
  )
}

const calculateDisplayName = (name: string, surname: string) => {
  let displayName = ''
  if (name) displayName += name

  if (surname) displayName += ` ${surname}`

  return displayName
}

const NameGroupFormControl = () => {
  const { watch, setValue } = useFormContext<ProfileInput>()

  const name = watch('name')
  const surname = watch('surname')
  const displayName = watch('displayName')

  useEffect(() => {
    const calculatedDisplayName = calculateDisplayName(name, surname)
    if (!displayName?.trim() || calculatedDisplayName.startsWith(displayName)) {
      setValue('displayName', calculateDisplayName(name, surname))
    }
  }, [name, surname, displayName, setValue])

  return (
    <>
      <HStack gap={4}>
        <InputFormControl name="name" label="Jméno" />
        <InputFormControl name="surname" label="Příjmení" />
      </HStack>
      <InputFormControl
        name="displayName"
        label="Zobrazované jméno"
        helperText="Celé jméno, které se bude zobrazovat ostatním uživatelům v aplikaci. Můžete použít například tituly a prostřední jméno."
      />
    </>
  )
}

import { useMutation, useQuery } from '@apollo/client'
import { Card, Heading, HStack, Stack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'

import { gql } from '@frontend/gql'
import { ProfileInput } from '@frontend/gql/graphql'
import { useAuth } from '@frontend/modules/auth'
import { Radio, toaster } from '@frontend/shared/design-system'
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

  const onSubmit = (variables: ProfileInput) => {
    console.log(variables)

    return updateProfile({
      variables: { profileInput: variables },
    })
      .then((res) => {
        if (!res.data)
          throw new Error('No data returned from updateProfile mutation')

        toaster.success({ title: 'Profil byl úspěšně uložen' })
        auth.signIn({
          token: auth.token,
          user: {
            ...auth.user!,
            id: auth.user!.id,
            contact: res.data!.updateProfile.contact,
          },
        })
      })
      .catch(() => {
        toaster.error({ title: 'Nepodařilo se uložit profil' })
      })
  }

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
  name: z.string().min(1),
  surname: z.string().min(1),
  displayName: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().min(9).optional(),
  addressStreet: z.string().optional(),
  addressStreetNumber: z.string().optional(),
  addressMunicipality: z.string().optional(),
  addressPostCode: z.string().optional(),
  gender: z.string().optional(),
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

const calculateDisplayName = (name?: string, surname?: string) => {
  let displayName = ''
  if (name?.trim()) displayName += name

  if (surname?.trim()) displayName += ` ${surname}`

  return displayName
}

const NameGroupFormControl = () => {
  const { getValues, setValue } = useFormContext<ProfileInput>()

  const displayNameUpdater = (name?: string, surname?: string) => {
    setValue('displayName', calculateDisplayName(name, surname), {
      shouldValidate: true,
    })
  }
  return (
    <>
      <HStack gap={4}>
        <InputFormControl
          name="name"
          label="Jméno"
          onChange={(changedName) => {
            displayNameUpdater(changedName, getValues('surname'))
          }}
        />
        <InputFormControl
          name="surname"
          label="Příjmení"
          onChange={(changedSurname) => {
            displayNameUpdater(getValues('name'), changedSurname)
          }}
        />
      </HStack>
      <InputFormControl
        name="displayName"
        label="Zobrazované jméno"
        helperText="Celé jméno, které se bude zobrazovat ostatním uživatelům v aplikaci. Můžete použít například tituly a prostřední jméno."
      />
    </>
  )
}

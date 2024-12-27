import { useMutation, useQuery } from '@apollo/client'

import { gql } from '@frontend/gql'
import { useAuth } from '@frontend/modules/auth'
import { toaster } from '@frontend/shared/design-system'

const GET_PROFILE_QUERY = gql(/* GraphQL */ `
  query GetUserById($getUserByIdId: Float!) {
    getUserById(id: $getUserByIdId) {
      id
      email
      password
      confirmed
      type
      notaryId
      sendNotifications
      name
      surname
      displayName
      gender
      phone
      addressId
      address {
        id
        street
        streetNumber
        municipality
        postalCode
      }
    }
  }
`)

const UPDATE_PROFILE_MUTATION = gql(/* GraphQL */ `
  mutation UpdateProfile($profileInput: ProfileInput!) {
    updateProfile(profileInput: $profileInput) {
      id
      email
      password
      confirmed
      type
      notaryId
      sendNotifications
      name
      surname
      displayName
      gender
      phone
      addressId
      address {
        id
        street
        streetNumber
        municipality
        postalCode
      }
    }
  }
`)

export const useProfile = () => {
  const auth = useAuth()
  const { data, loading } = useQuery(GET_PROFILE_QUERY, {
    variables: { getUserByIdId: +auth.user!.id },
    onError: (error) => {
      toaster.error({ title: 'Nepodařilo se načíst profil' })
    },
  })

  const [updateProfile] = useMutation(UPDATE_PROFILE_MUTATION, {
    onError: (error) => {
      toaster.error({ title: 'Nepodařilo se uložit profil' })
    },
    onCompleted: (data) => {
      if (!data) throw new Error('No data returned from updateProfile mutation')

      toaster.success({ title: 'Profil byl úspěšně uložen.' })
      auth.signIn({
        token: auth.token,
        user: {
          ...auth.user!,
          ...data.updateProfile,
        },
      })
    },
  })

  return { profile: data?.getUserById ?? undefined, loading, updateProfile }
}

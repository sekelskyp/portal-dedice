import { useQuery } from '@apollo/client'

import { gql } from '@frontend/gql'
import { useAuth } from '@frontend/modules/auth'

export const GET_NOTARY_DATE_RULES = gql(/* GraphQL */ `
  query GetNotaryDateRules($notaryId: Int!) {
    getNotaryDateRulesByNotary(notaryId: $notaryId) {
      id
      startDay
      startMonth
      endDay
      endMonth
    }
  }
`)

export const GET_NOTARY_ADDRESS_RULES = gql(/* GraphQL */ `
  query GetNotaryAddressRules($getNotaryByIdId: Int!) {
    getNotaryById(id: $getNotaryByIdId) {
      postalCode
    }
  }
`)

export function useGetNotaryDateRules() {
  const { user } = useAuth()
  const { data, loading, error } = useQuery(GET_NOTARY_DATE_RULES, {
    variables: {
      notaryId: user?.notaryId ? parseInt(user.notaryId, 10) : 0,
    },
  })

  return { data, loading, error }
}

export function useGetNotaryAddressRules() {
  const { user } = useAuth()
  const { data, loading, error } = useQuery(GET_NOTARY_ADDRESS_RULES, {
    variables: {
      getNotaryByIdId: user?.notaryId ? parseInt(user.notaryId, 10) : 0,
    },
  })

  return { data, loading, error }
}

export function useGetNotaryAddressRuleById({ id }: { id: number }) {
  const { data, loading, error } = useQuery(GET_NOTARY_ADDRESS_RULES, {
    variables: {
      getNotaryByIdId: id,
    },
  })

  return { data, loading, error }
}

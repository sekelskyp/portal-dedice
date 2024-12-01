import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { useDebounceValue } from 'usehooks-ts'

import { gql } from '@frontend/gql'
import { AddressSuggestion } from '@frontend/gql/graphql'

const GET_ADDRESS_SUGGESTIONS = gql(`
  query GetAddressSuggestions($query: String!) {
  getAddressSuggestions(query: $query) {
    street
    streetNumber
    municipality
    postalCode
  }
}
`)

/**
 * Custom React hook for fetching address suggestions via GraphQL mutation.
 *
 * @param query - The search query string.
 * @param options - Optional parameters including language, limit, and type.
 * @returns An object containing suggestions, loading state, and error message.
 */
function useAddressSuggestions(query: string): {
  suggestions: AddressSuggestion[]
  loading: boolean
  error: string | null
} {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [debouncedQuery, setDebouncedQuery] = useDebounceValue(query, 300)
  const [error, setError] = useState<string | null>(null)
  const enable = true

  const { loading, data } = useQuery(GET_ADDRESS_SUGGESTIONS, {
    variables: { query: debouncedQuery },
  })

  // Debounce the query input to limit API calls
  useEffect(() => {
    setDebouncedQuery(query)
  }, [query, setDebouncedQuery])
  // Fetch suggestions when the debounced query or options change
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedQuery || (debouncedQuery.length < 3 && enable)) {
        setSuggestions([])
        return
      }

      setError(null)

      try {
        setSuggestions(data?.getAddressSuggestions ?? [])
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message)
        setSuggestions([])
      }
    }

    fetchSuggestions()
  }, [data?.getAddressSuggestions, debouncedQuery, enable])

  return { suggestions, loading, error }
}

export default useAddressSuggestions

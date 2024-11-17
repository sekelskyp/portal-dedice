import { useEffect, useState } from 'react'

interface Position {
  lon: number
  lat: number
}

interface RegionalStructure {
  name: string
  type: string
  isoCode?: string
}

export interface Suggestion {
  name: string
  label: string
  position: Position
  type: string
  location: string
  regionalStructure: RegionalStructure[]
  zip?: string
}

export interface Address {
  street: string
  streetNumber: string
  municipality: string
  postCode: string
}

export function suggestionToAddress(suggestion?: Suggestion): Address {
  if (!suggestion) {
    return {
      street: '',
      streetNumber: '',
      municipality: '',
      postCode: '',
    }
  }

  return {
    street: suggestion.regionalStructure.find(
      (x) => x.type === 'regional.street'
    )?.name!,
    streetNumber: suggestion.regionalStructure.find(
      (x) => x.type === 'regional.address'
    )?.name!,
    municipality: suggestion.regionalStructure.find(
      (x) => x.type === 'regional.municipality'
    )?.name!,
    postCode: suggestion.zip!,
  }
}

interface UseAddressSuggestionsOptions {
  lang?: string
  limit?: number
  type?: string
  enable?: boolean
}

const API_KEY = 'l32SlrhyjXlQWr2O22ih2ZXHaLPG3vYVEiacB8n-Il8'

/**
 * Custom React hook for fetching address suggestions from Mapy.cz Geocoding API.
 *
 * @param query - The search query string.
 * @param options - Optional parameters including language, limit, and type.
 * @returns An object containing suggestions, loading state, and error message.
 */
function useAddressSuggestions(
  query: string,
  options: UseAddressSuggestionsOptions = {}
): { suggestions: Suggestion[]; loading: boolean; error: string | null } {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [debouncedQuery, setDebouncedQuery] = useState(query)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { lang = 'cz', limit = 10, type = 'regional.address' } = options

  // Debounce the query input to limit API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [query])

  // Fetch suggestions when the debounced query or options change
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedQuery || (debouncedQuery.length < 3 && options.enable)) {
        setSuggestions([])
        return
      }

      setLoading(true)
      setError(null)

      try {
        const url = new URL('https://api.mapy.cz/v1/geocode')
        url.searchParams.append('query', debouncedQuery)
        url.searchParams.append('lang', lang)
        url.searchParams.append('apiKey', API_KEY)
        url.searchParams.append('locality', 'cz')
        if (limit) {
          url.searchParams.append('limit', limit.toString())
        }
        if (type) {
          url.searchParams.append('type', type)
        }

        const response = await fetch(url.toString())

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data: { items: Suggestion[] } = await response.json()
        setSuggestions(data.items)
      } catch (err) {
        setError((err as Error).message)
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }

    fetchSuggestions()
  }, [debouncedQuery, lang, limit, type, options.enable])

  return { suggestions, loading, error }
}

export default useAddressSuggestions

import { Arg, Query, Resolver } from 'type-graphql'

import { AddressSuggestion } from './addressSuggestionType'

@Resolver(() => AddressSuggestion)
export class AddressSuggestionResolver {
  @Query(() => [AddressSuggestion])
  async getAddressSuggestions(
    @Arg('query') query: string
  ): Promise<AddressSuggestion[]> {
    if (!query || query.length < 3) {
      return []
    }

    try {
      const url = new URL('https://api.mapy.cz/v1/geocode')
      url.searchParams.append('query', query)
      url.searchParams.append('lang', 'cs')
      url.searchParams.append('apikey', process.env.MAPY_API_KEY ?? '')
      url.searchParams.append('locality', 'cz')
      url.searchParams.append('limit', (10).toString())
      url.searchParams.append('type', 'regional.address')

      const response = await fetch(url.toString())
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = (await response.json()) as { items: Suggestion[] }

      var addresses = data.items.map((suggestion) => ({
        street: suggestion.regionalStructure.find(
          (x) => x.type === 'regional.street'
        )?.name!,
        streetNumber: suggestion.regionalStructure.find(
          (x) => x.type === 'regional.address'
        )?.name!,
        municipality: suggestion.regionalStructure.find(
          (x) => x.type === 'regional.municipality'
        )?.name!,
        postalCode: suggestion.zip!,
      }))

      return addresses
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}

interface Position {
  lon: number
  lat: number
}

interface RegionalStructure {
  name: string
  type: string
  isoCode?: string
}

interface Suggestion {
  name: string
  label: string
  position: Position
  type: string
  location: string
  regionalStructure: RegionalStructure[]
  zip?: string
}

import { getGeocode, getZipCode } from 'use-places-autocomplete'

export const getZipCodeFromAddress = async (
  address: string
): Promise<string> => {
  try {
    const results = await getGeocode({ address })
    return getZipCode(results[0], false) || ''
  } catch (error) {
    return ''
  }
}

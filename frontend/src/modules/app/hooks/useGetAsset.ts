import { gql, useQuery } from '@apollo/client'

export const GET_ASSETS = gql`
  query getAssetsByProcedureId($proceedingId: Int!) {
    getAssetsByProceedingId(proceedingId: $proceedingId) {
      id
      proceedingId
      type
      name
      value
      description
      bankName
      carMakeName
      carRegistrationDate
      carType
      cin
    }
  }
`

export const useGetAssets = (proceedingId?: number) => {
  const { data, loading, error } = useQuery(GET_ASSETS, {
    variables: { proceedingId },
    skip: !proceedingId,
  })

  console.log(
    'Assets by type:',
    data?.getAssetsByProceedingId?.reduce(
      (
        acc: Record<string, typeof data.getAssetsByProceedingId>,
        asset: (typeof data.getAssetsByProceedingId)[0]
      ) => {
        acc[asset.type] = [...(acc[asset.type] || []), asset]
        return acc
      },
      {}
    )
  )

  return { data, loading, error }
}

interface Asset {
  type: string
  bankName?: string
  cin?: string
  carMakeName?: string
  carRegistrationDate?: string
  description?: string
}

export const mapAssetsToFormData = (
  assets: Asset[]
): Record<string, unknown> => {
  const formData: Record<
    string,
    | {
        [key: string]:
          | string
          | number
          | string[]
          | undefined
          | { [key: string]: string | number | string[] | undefined }[]
      }
    | { ico?: string }[]
    | { brand?: string; year?: number; description?: string }[]
  > = {}

  assets.forEach((asset) => {
    switch (asset.type) {
      case 'Financial instrument':
        formData.bankAccount = {
          bank: asset.bankName ? [asset.bankName] : [],
        }
        break
      case 'Company':
        formData.company = [
          {
            ico: asset.cin,
          },
        ]
        break
      case 'Automobile':
        formData.car = [
          {
            brand: asset.carMakeName,
            year: asset.carRegistrationDate
              ? new Date(asset.carRegistrationDate).getFullYear()
              : undefined,
            description: asset.description,
          },
        ]
        break
      case 'Valuables':
        formData.valuables = {
          description: asset.description,
        }
        break
      case 'Other':
        formData.others = {
          description: asset.description,
        }
        break
    }
  })

  return formData
}

import { gql, useQuery } from '@apollo/client'

import { AssetFormData } from '../components/AssetForm'

export const GET_ASSETS = gql`
  query getAssetsByProcedureId($procedureId: Int!) {
    getAssetsByProceedingId(proceedingId: $procedureId) {
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
    variables: { procedureId: proceedingId },
    skip: !proceedingId,
  })

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

export const mapAssetsToFormData = (assets: Asset[]): AssetFormData => {
  const formData: AssetFormData = {}

  const bankAssets = assets.filter(
    (asset) => asset.type === 'Financial instrument'
  )
  if (bankAssets.length > 0) {
    formData.bankAccount = {
      bank: bankAssets
        .map((asset) => asset.bankName)
        .filter(Boolean) as string[],
    }
  }

  assets.forEach((asset) => {
    switch (asset.type) {
      case 'Company':
        if (!formData.company) {
          formData.company = []
        }
        if (asset.cin) {
          formData.company.push({ ico: asset.cin })
        }
        break
      case 'Automobile':
        if (!formData.car) {
          formData.car = []
        }
        formData.car.push({
          brand: asset.carMakeName,
          year: asset.carRegistrationDate
            ? new Date(asset.carRegistrationDate).getFullYear()
            : undefined,
          description: asset.description,
        })
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

import { gql, useMutation } from '@apollo/client'

import { AssetType, CreateAssetInput } from './useAddAsset'

export const UPDATE_ASSET = gql`
  mutation UpdateAsset($id: Int!, $data: AssetInput!) {
    updateAsset(id: $id, data: $data) {
      id
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

export const useUpdateAsset = () => {
  const [updateAssetMutation, { loading, error }] = useMutation(UPDATE_ASSET, {
    refetchQueries: ['getAssetsByProcedureId'],
  })

  const updateAsset = async (id: number, data: Partial<CreateAssetInput>) => {
    try {
      const response = await updateAssetMutation({
        variables: {
          id,
          data: {
            proceedingId: data.proceedingId,
            type: data.type as AssetType,
            name: data.name,
            value: data.value || 0,
            description: data.description,
            bankName: data.bankName,
            carMakeName: data.carMakeName,
            carRegistrationDate: data.carRegistrationDate,
            carType: data.carType,
            cin: data.cin,
          },
        },
      })
      return response.data.updateAsset
    } catch (err) {
      console.error('Error updating asset:', err)
      throw err
    }
  }

  return { updateAsset, loading, error }
}

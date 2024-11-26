import { gql, useMutation } from '@apollo/client'

import { CreateAssetInput } from './useAddAsset'

const UPDATE_ASSET = gql`
  mutation updateAsset($id: Int!, $data: AssetInput!) {
    updateAsset(id: $id, data: $data) {
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

export const useUpdateAsset = () => {
  const [updateAsset, { loading, error }] = useMutation(UPDATE_ASSET, {
    refetchQueries: ['getAssetsByProcedureId'],
  })

  const updateAssetFn = async (id: number, data: Partial<CreateAssetInput>) => {
    try {
      const response = await updateAsset({
        variables: {
          id,
          data,
        },
      })
      return response.data.updateAsset
    } catch (err) {
      console.error('Error updating asset:', err)
      throw err
    }
  }

  return { updateAsset: updateAssetFn, loading, error }
}

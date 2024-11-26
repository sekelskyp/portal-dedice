import { useMutation } from '@apollo/client'

import { CreateAssetInput, UPDATE_ASSET } from './useAddAsset'

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


import { gql, useMutation } from '@apollo/client'

const DELETE_ASSET = gql`
  mutation deleteAsset($id: Int!) {
    deleteAsset(id: $id)
  }
`

export const useDeleteAsset = () => {
  const [deleteAsset, { loading, error }] = useMutation(DELETE_ASSET, {
    refetchQueries: ['getAssetsByProcedureId'],
  })

  const removeAsset = async (id: number) => {
    try {
      await deleteAsset({
        variables: { id },
      })
      return true
    } catch (err) {
      console.error('Error deleting asset:', err)
      throw err
    }
  }

  return { removeAsset, loading, error }
}
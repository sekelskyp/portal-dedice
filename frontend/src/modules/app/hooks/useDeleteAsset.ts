import { gql, useMutation } from '@apollo/client'

const DELETE_ASSET = gql`
  mutation DeleteAsset($id: Int!) {
    deleteAsset(id: $id)
  }
`

export const useDeleteAsset = () => {
  const [deleteAsset, { loading }] = useMutation(DELETE_ASSET, {
    update(cache, { data }) {
      if (data?.deleteAsset) {
        try {
          cache.modify({
            fields: {
              getAssetsByProceedingId(existingAssets = [], { readField }) {
                return existingAssets.filter(
                  (assetRef: { id: number }) =>
                    readField('id', assetRef) !== data.deleteAsset
                )
              },
            },
          })
        } catch (error) {
          console.error('Cache update failed:', error)
        }
      }
    },
    refetchQueries: ['GetAssetsByProcedureId'], // Add this back as fallback
  })

  const removeAsset = async (id: number) => {
    const response = await deleteAsset({
      variables: { id },
    })

    if (!response.data?.deleteAsset) {
      throw new Error('Nepodařilo se smazat majetek')
    }

    return true
  }

  return { removeAsset, loading }
}

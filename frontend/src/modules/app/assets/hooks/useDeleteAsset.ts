import { gql, useMutation } from '@apollo/client'

import { GET_ASSETS } from './useGetAsset'

const DELETE_ASSET = gql`
  mutation DeleteAsset($id: Int!) {
    deleteAsset(id: $id)
  }
`

export const useDeleteAsset = (proceedingId: number) => {
  const [deleteAsset, { loading }] = useMutation(DELETE_ASSET, {
    optimisticResponse: (vars) => ({
      deleteAsset: vars.id,
    }),
    refetchQueries: [
      {
        query: GET_ASSETS,
        variables: { procedureId: proceedingId },
      },
    ],
    update(cache, { data }) {
      const deletedId = data?.deleteAsset
      if (deletedId) {
        const cacheId = cache.identify({ id: deletedId, __typename: 'Asset' })
        cache.evict({ id: cacheId })
        cache.gc()
      }
    },
  })

  const removeAsset = async (id: number) => {
    try {
      const response = await deleteAsset({
        variables: { id },
      })

      if (!response.data?.deleteAsset) {
        throw new Error('Nepodařilo se smazat majetek')
      }

      return response.data.deleteAsset
    } catch (error) {
      throw error
    }
  }

  return { removeAsset, loading }
}

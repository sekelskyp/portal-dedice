import { gql, useQuery } from '@apollo/client'
import { Box, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import { FaCalculator, FaTimes } from 'react-icons/fa'
import { useParams } from 'react-router-dom'

import { useAuth } from '@frontend/modules/auth'
import { Alert } from '@frontend/shared/design-system/atoms/chakra/alert'
import { Button } from '@frontend/shared/design-system/atoms/chakra/button'
import { RouterNavLink } from '@frontend/shared/navigation/atoms'
import { route } from '@shared/route'

import { useDeleteAsset } from '../hooks/useDeleteAsset'
import { useProcedure } from '../hooks/useProcedure'

const GET_ASSETS = gql`
  query getAssetsByProcedureId($procedureId: Int!) {
    getAssetsByProcedureId(procedureId: $procedureId) {
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

interface Asset {
  id: number
  type: string
  name: string
  value: number
  description?: string
  bankName?: string
  carMakeName?: string
  carRegistrationDate?: string
  carType?: string
  cin?: string
}

const AssetGroup = ({
  assets,
  type,
  onDelete,
}: {
  assets: Asset[]
  type: string
  onDelete: (id: number) => void
}) => {
  const { id } = useParams()

  const { user } = useAuth()

  const procedure = useProcedure({ procedureId: parseInt(id ?? '0', 10) })

  if (assets.length === 0) return null

  const getAssetDetails = (asset: Asset) => {
    switch (asset.type) {
      case 'Financial instrument':
        return `${asset.bankName}`
      case 'Company':
        return `IČO: ${asset.cin}`
      case 'Automobile':
        return `${asset.carMakeName} (${new Date(asset.carRegistrationDate!).getFullYear()}) ${asset.description}`
      default:
        return asset.description
    }
  }

  return (
    <Box p={4} borderWidth={1} borderRadius="md" mb={4}>
      <Heading size="md" mb={3}>
        {type}
      </Heading>
      <VStack align="stretch" gap={2}>
        {assets.map((asset) => (
          <HStack key={asset.id} pl={4}>
            <Box flex={1}>
              <Text fontWeight="bold">{asset.name}</Text>
              <Text>{getAssetDetails(asset)}</Text>
            </Box>
            {procedure?.data?.getProcedureById?.beneficiaries?.some(
              (item) => item.id === user?.beneficiaries[0]?.id
            ) && (
              <Button
                aria-label="Delete asset"
                size="sm"
                variant="ghost"
                onClick={() => onDelete(asset.id)}
              >
                <FaTimes />
              </Button>
            )}
          </HStack>
        ))}
      </VStack>
    </Box>
  )
}

export function Assets({ id }: { id: string }) {
  const { user } = useAuth()
  const { data, loading, error } = useQuery(GET_ASSETS, {
    variables: { procedureId: parseInt(id, 10) },
  })
  const { removeAsset } = useDeleteAsset()

  const handleDelete = async (assetId: number | string) => {
    try {
      await removeAsset(Number(assetId))
    } catch (error) {
      console.error('Failed to delete asset:', error)
    }
  }

  const assets = data?.getAssetsByProcedureId || []

  if (loading) return <Text>Načítání...</Text>
  if (error) return <Text color="red.500">Chyba při načítání majetku</Text>

  if (assets.length === 0) {
    return (
      <Stack>
        <Heading mb={4}>Majetek v řízení</Heading>
        <Alert
          width={'fit-content'}
          status="info"
          title="V řízení není evidován žádný majetek."
        />
        {!user?.isNotary && (
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            justifyContent="center"
            mb={4}
          >
            <RouterNavLink
              to={route.newAsset(id)}
              width="fit-content"
              rounded={'full'}
            >
              Přidat/upravit Majetek
              <FaCalculator />
            </RouterNavLink>
          </Stack>
        )}
      </Stack>
    )
  }

  const groupedAssets =
    data?.getAssetsByProcedureId?.reduce(
      (acc: Record<string, Asset[]>, asset: Asset) => {
        if (!acc[asset.type]) {
          acc[asset.type] = []
        }
        acc[asset.type].push(asset)
        return acc
      },
      {}
    ) || {}

  const assetTypes = {
    'Financial instrument': 'Bankovní účty',
    Company: 'Obchodní společnosti',
    Automobile: 'Automobily',
    Valuables: 'Cennosti',
    Other: 'Ostatní majetek',
  }

  return (
    <Stack>
      <Heading mb={4}>Majetek v řízení</Heading>
      <Stack>
        {Object.entries(assetTypes).map(([type, label]) => (
          <AssetGroup
            key={type}
            type={label}
            assets={groupedAssets[type] || []}
            onDelete={handleDelete}
          />
        ))}
      </Stack>
      {!user?.isNotary && (
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          justifyContent="center"
          mb={4}
        >
          <RouterNavLink
            to={route.newAsset(id)}
            width="fit-content"
            rounded={'full'}
          >
            Přidat/upravit Majetek
            <FaCalculator />
          </RouterNavLink>
        </Stack>
      )}
    </Stack>
  )
}

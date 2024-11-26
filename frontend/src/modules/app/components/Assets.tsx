import { useQuery } from '@apollo/client'
import { Box, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import { FaMoneyBill, FaTimes } from 'react-icons/fa'
import { useParams } from 'react-router-dom'

import { useAuth } from '@frontend/modules/auth'
import { Alert } from '@frontend/shared/design-system/atoms/chakra/alert'
import { Button } from '@frontend/shared/design-system/atoms/chakra/button'
import { toaster } from '@frontend/shared/design-system/atoms/chakra/toaster'
import { RouterNavLink } from '@frontend/shared/navigation/atoms'
import { route } from '@shared/route'

import { useDeleteAsset } from '../hooks/useDeleteAsset'
import { GET_ASSETS } from '../hooks/useGetAsset'
import { useProceeding } from '../hooks/useProceeding'

//TODO: fix query and components

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
  const { data: procedureData } = useProceeding(parseInt(id ?? '0', 10))

  if (assets.length === 0) return null

  const getAssetDetails = (asset: Asset) => {
    switch (asset.type) {
      case 'Financial instrument':
        return asset.bankName
      case 'Company':
        return `IČO: ${asset.cin}`
      case 'Automobile':
        return (
          <VStack align="start">
            <Text fontSize="sm">
              Rok registrace:{' '}
              {new Date(asset.carRegistrationDate!).getFullYear()}
            </Text>
            {asset.description && (
              <Text fontSize="sm">Popis: {asset.description}</Text>
            )}
          </VStack>
        )
      default:
        return asset.description
    }
  }

  return (
    <Box p={4} borderWidth={1} borderRadius="md" mb={4} bg="gray.50">
      <Heading size="md" mb={4}>
        {type}
      </Heading>
      <VStack align="stretch" gap={3}>
        {assets.map((asset) => (
          <Box
            key={asset.id}
            p={3}
            borderWidth={1}
            borderRadius="md"
            bg="white"
            boxShadow="sm"
            _hover={{ boxShadow: 'md' }}
            transition="all 0.2s"
          >
            <HStack justify="space-between">
              <VStack align="start" gap={1} flex={1}>
                <Text fontWeight="bold" fontSize="lg">
                  {asset.name}
                </Text>
                {getAssetDetails(asset)}
              </VStack>
              {procedureData?.getProceedingById?.beneficiaries?.some(
                (item) => item.user?.id === user?.id?.toString()
              ) && (
                <Button
                  aria-label="Delete asset"
                  size="sm"
                  colorScheme="red"
                  variant="ghost"
                  onClick={() => onDelete(asset.id)}
                >
                  <FaTimes />
                </Button>
              )}
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  )
}

export function Assets({ id }: { id: string }) {
  const { user } = useAuth()
  const isNotary = user?.type === 'Notary'
  const { data, loading, error } = useQuery(GET_ASSETS, {
    variables: { procedureId: +id },
  })
  const { removeAsset } = useDeleteAsset(+id)

  const handleDelete = async (assetId: number | string) => {
    if (!window.confirm('Opravdu chcete smazat tento majetek?')) return

    try {
      await removeAsset(Number(assetId))
      toaster.create({
        title: 'Majetek byl úspěšně smazán',
        type: 'success',
      })
    } catch (error) {
      toaster.create({
        title: 'Nepodařilo se smazat majetek',
        type: 'error',
      })
    }
  }

  const assets = data?.getAssetsByProceedingId || []

  console.log(assets)

  if (loading) return <Text>Načítání...</Text>
  if (error) return <Text color="red.500">Chyba při načítání majetku</Text>

  const groupedAssets = assets.reduce(
    (acc: Record<string, Asset[]>, asset: Asset) => {
      if (!acc[asset.type]) {
        acc[asset.type] = []
      }
      acc[asset.type].push(asset)
      return acc
    },
    {}
  )

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
      {assets.length === 0 ? (
        <Alert
          width={'fit-content'}
          status="info"
          title="V řízení není evidován žádný majetek."
        />
      ) : (
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
      )}
      {!isNotary && (
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
            <FaMoneyBill />
          </RouterNavLink>
        </Stack>
      )}
    </Stack>
  )
}

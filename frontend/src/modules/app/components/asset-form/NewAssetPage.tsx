import React, { useCallback, useMemo } from 'react'
import { Container, Heading, Spinner, Text, VStack } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'

import { Asset } from '@frontend/gql/graphql'
import { Page } from '@frontend/shared/layout/Page'
import { route } from '@shared/route'

import { AssetType, useAddAsset } from '../../hooks/useAddAsset'
import { mapAssetsToFormData, useGetAssets } from '../../hooks/useGetAsset'
import { AssetForm, AssetFormData } from '../asset-form/AssetForm'

export const NewAssetPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addAsset: createAssetRequest } = useAddAsset()
  const { data: existingAssets, loading } = useGetAssets(parseInt(id!, 10))

  const handleFormSubmit = useCallback(
    async (formData: AssetFormData) => {
      if (!id) return

      try {
        const assets = mapFormDataToAssets(formData)
        const existingAssetsByType =
          existingAssets?.getAssetsByProcedureId?.reduce(
            (acc: Record<string, Asset>, asset: Asset) => {
              acc[asset.type] = asset
              return acc
            },
            {}
          ) || {}

        await Promise.all(
          assets.map(async (asset) => {
            const existingAsset = existingAssetsByType[asset.type]
            if (existingAsset) {
              // Update existing asset
              return updateAsset(parseInt(existingAsset.id, 10), {
                // inheritanceProcedureId: parseInt(id, 10),
                value: 0,
                ...asset,
                type: asset.type as AssetType,
              })
            } else {
              // Create new asset if it doesn't exist
              return createAssetRequest({
                inheritanceProcedureId: parseInt(id, 10),
                value: 0,
                ...asset,
                type: asset.type as AssetType,
              })
            }
          })
        )

        navigate(route.inheritanceProcedure(id))
      } catch (error) {
        console.error('Error managing assets:', error)
      }
    },
    [createAssetRequest, id, navigate, existingAssets]
  )

  const defaultValues = useMemo(() => {
    const assets = existingAssets?.getAssetsByProceedingId
    if (!assets?.length) {
      return undefined
    }

    return mapAssetsToFormData(assets)
  }, [existingAssets])

  if (!id) {
    return <div>Missing procedure ID</div>
  }

  if (loading) {
    return (
      <Page>
        <Container centerContent>
          <Spinner />
        </Container>
      </Page>
    )
  }

  const isEditMode = existingAssets?.getAssetsByProcedureId?.length > 0

  return (
    <Page>
      <VStack gap={8} width="100%" align="stretch">
        <Container
          maxW="100%"
          px={{ base: 4, md: 8 }}
          py={{ base: 6, md: 12 }}
          borderWidth={1}
          borderRadius={3}
        >
          <Heading
            size={{ base: '2xl', md: '4xl' }}
            mb={4}
            textAlign={{ base: 'center', md: 'left' }}
          >
            {isEditMode ? 'Upravit majetek zůstavitele' : 'Majetek zůstavitele'}
          </Heading>
          <Text
            fontSize={{ base: 'sm', md: 'lg' }}
            color="gray.600"
            maxW="650px"
            textAlign={{ base: 'center', md: 'left' }}
          >
            Pro každý typ majetku prosím zvolte, zda jej zůstavitel vlastnil či
            nikoliv. V případě, že majetek vlastnil, vyplňte příslušné údaje v
            dané sekci.
          </Text>
          <AssetForm
            onSubmit={handleFormSubmit}
            inheritanceProcedureId={parseInt(id, 10)}
            defaultValues={defaultValues}
            isEditMode={!!defaultValues}
          />
        </Container>
      </VStack>
    </Page>
  )
}

function mapFormDataToAssets(data: AssetFormData): Array<{
  type: string
  name: string
  description?: string
  bankName?: string
  cin?: string
  carMakeName?: string
  carType?: string
  carRegistrationDate?: Date
  value?: number
}> {
  const assets = []

  if (data.bankAccount?.bank?.length) {
    data.bankAccount.bank.forEach((bank) => {
      if (bank) {
        assets.push({
          type: 'Financial instrument',
          name: 'Bankovní účet',
          description: `Bankovní účet: ${bank}`,
          bankName: bank,
          value: 0,
        })
      }
    })
  }

  if (data.company?.length) {
    data.company.forEach((company) => {
      if (company.ico) {
        assets.push({
          type: 'Company',
          name: 'Obchodní společnost',
          description: `IČO: ${company.ico}`,
          cin: company.ico,
          value: 0,
        })
      }
    })
  }
  if (data.car?.length) {
    data.car.forEach((car) => {
      if (car.brand) {
        assets.push({
          type: 'Automobile',
          name: `Auto ${car.brand}`,
          description: car.description || undefined,
          carMakeName: car.brand,
          carType: car.description,
          carRegistrationDate: car.year ? new Date(car.year, 0, 1) : undefined,
          value: 0,
        })
      }
    })
  }

  if (data.valuables?.description) {
    assets.push({
      type: 'Valuables',
      name: 'Cennosti',
      description: data.valuables.description,
      value: 0,
    })
  }

  if (data.others?.description) {
    assets.push({
      type: 'Other',
      name: 'Ostatní majetek',
      description: data.others.description,
      value: 0,
    })
  }

  return assets
}
function updateAsset(
  arg0: number,
  arg1: {
    type: AssetType
    name: string
    description?: string
    bankName?: string
    cin?: string
    carMakeName?: string
    carType?: string
    carRegistrationDate?: Date
    value: number
  }
): Promise<void> {
  throw new Error('Function not implemented.')
}

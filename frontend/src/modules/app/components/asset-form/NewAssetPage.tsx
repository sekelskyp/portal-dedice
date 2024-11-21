import React, { useCallback, useMemo } from 'react'
import { Container, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'

import { Asset } from '@frontend/gql/graphql'
import { Page } from '@frontend/shared/layout/Page'
import { route } from '@shared/route'

import { useAddAsset } from '../../hooks/useAddAsset'
import { useDeleteAsset } from '../../hooks/useDeleteAsset'
import { useGetAssets } from '../../hooks/useGetAsset'
import { AssetForm, AssetFormData } from '../asset-form/AssetForm'

export const NewAssetPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addAsset: createAssetRequest } = useAddAsset()
  const { removeAsset: deleteAsset } = useDeleteAsset()
  const { data: existingAssets } = useGetAssets(parseInt(id!, 10))
  const isMobile = useMediaQuery('(max-width: 768px)')

  const handleFormSubmit = useCallback(
    async (formData: AssetFormData) => {
      if (!id) {
        console.error('No procedure ID provided')
        return
      }

      const assets = mapFormDataToAssets(formData)

      try {
        // Delete existing assets first
        if (existingAssets?.getAssetsByProcedureId?.length > 0) {
          await Promise.all(
            existingAssets.getAssetsByProcedureId.map((asset: Asset) =>
              deleteAsset(parseInt(asset.id, 10))
            )
          )
        }

        // Create new assets one at a time to prevent duplicates
        for (const asset of assets) {
          await createAssetRequest({
            inheritanceProcedureId: parseInt(id, 10),
            value: 0,
            ...asset,
            carRegistrationDate: asset.carRegistrationDate
              ? new Date(asset.carRegistrationDate)
              : undefined,
          })
        }

        navigate(route.inheritanceProcedure(id))
      } catch (error) {
        console.error('Error managing assets:', error)
      }
    },
    [createAssetRequest, deleteAsset, id, navigate, existingAssets]
  )

  // Transform existing assets to form data
  const defaultValues = useMemo(() => {
    if (!existingAssets?.getAssetsByProcedureId) return undefined

    const formData: AssetFormData = {}

    // Group assets by type first
    const groupedAssets = existingAssets.getAssetsByProcedureId.reduce(
      (acc: Record<string, Asset[]>, asset: Asset) => {
        if (!acc[asset.type]) {
          acc[asset.type] = []
        }
        acc[asset.type].push(asset)
        return acc
      },
      {}
    )

    // Process grouped assets
    if (groupedAssets['Financial instrument']?.length > 0) {
      formData.bankAccount = {
        bank: groupedAssets['Financial instrument'].map(
          (asset: Asset) => asset.bankName || ''
        ),
      }
    }

    if (groupedAssets['Company']?.[0]) {
      formData.company = {
        ico: groupedAssets['Company'][0].cin || '',
      }
    }

    if (groupedAssets['Automobile']?.[0]) {
      const car = groupedAssets['Automobile'][0]
      formData.car = {
        brand: car.carMakeName || '',
        year: car.carRegistrationDate
          ? new Date(car.carRegistrationDate).getFullYear()
          : undefined,
        description: car.description || '', // Changed from carType to description
      }
    }

    if (groupedAssets['Valuables']?.[0]) {
      formData.valuables = {
        description: groupedAssets['Valuables'][0].description || '',
      }
    }

    if (groupedAssets['Other']?.[0]) {
      formData.others = {
        description: groupedAssets['Other'][0].description || '',
      }
    }

    return formData
  }, [existingAssets])

  if (!id) {
    return <div>Missing procedure ID</div>
  }

  return (
    <Page>
      {isMobile ? (
        <VStack
          borderWidth={1}
          gap={6}
          borderRadius={4}
          py={4}
          justifyContent={'center'}
        >
          <Container>
            <Heading size={'4xl'}>Určení Majetku</Heading>
            <Text>
              Formulář pro určení majetku zůstavitele. V případě, že zůstavitel
              nevlastní některé z typu majetku, zaškrtněte "Ne".
            </Text>
          </Container>
          <Container maxW="container.lg">
            <AssetForm
              onSubmit={handleFormSubmit}
              inheritanceProcedureId={parseInt(id, 10)}
              defaultValues={defaultValues}
            />
          </Container>
        </VStack>
      ) : (
        <HStack flex={1} borderWidth={1} gap={6} borderRadius={4} py={4}>
          <Container maxW={'30%'}>
            <Heading size={'4xl'}>Určení Majetku</Heading>
            <Text fontSize={{ base: 'lg', md: 'sm' }}>
              Formulář pro určení majetku zůstavitele. V případě, že zůstavitel
              nevlastní některé z typu majetku, zaškrtněte "Ne".
            </Text>
          </Container>
          <Container maxW="container.lg" flex={2}>
            <AssetForm
              onSubmit={handleFormSubmit}
              inheritanceProcedureId={parseInt(id, 10)}
              defaultValues={defaultValues}
            />
          </Container>
        </HStack>
      )}
    </Page>
  )
}

function mapFormDataToAssets(data: AssetFormData) {
  const assets = []

  if (data.bankAccount?.bank?.length) {
    // Create separate asset for each bank
    data.bankAccount.bank.forEach((bank) => {
      assets.push({
        type: 'Financial instrument',
        name: 'Bankovní účet',
        description: `Bankovní účet: ${bank}`,
        bankName: bank,
      })
    })
  }

  if (data.company?.ico) {
    assets.push({
      type: 'Company',
      name: 'Obchodní společnost',
      description: `IČO: ${data.company.ico}`,
      cin: data.company.ico,
    })
  }

  if (data.car?.brand) {
    assets.push({
      type: 'Automobile',
      name: `Auto ${data.car.brand}`,
      description: data.car.description || '',
      carMakeName: data.car.brand,
      carType: data.car.description || '', // Also store in carType
      carRegistrationDate: data.car.year
        ? new Date(data.car.year, 0, 1).toISOString()
        : undefined,
    })
  }

  if (data.valuables?.description) {
    assets.push({
      type: 'Valuables',
      name: 'Cennosti',
      description: data.valuables.description,
    })
  }

  if (data.others?.description) {
    assets.push({
      type: 'Other',
      name: 'Ostatní majetek',
      description: data.others.description,
    })
  }

  return assets
}

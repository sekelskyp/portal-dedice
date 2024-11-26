import React, { useCallback, useMemo } from 'react'
import { Container, Heading, Spinner, Text, VStack } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'

import { Asset } from '@frontend/gql/graphql'
import { Page } from '@frontend/shared/layout/Page'
import { route } from '@shared/route'

import { AssetType, useAddAsset } from '../../hooks/useAddAsset'
import { useDeleteAsset } from '../../hooks/useDeleteAsset'
import { useGetAssets } from '../../hooks/useGetAsset'
import { AssetForm, AssetFormData } from '../asset-form/AssetForm'

export const NewAssetPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addAsset: createAssetRequest } = useAddAsset()
  const { removeAsset: deleteAsset } = useDeleteAsset()
  const { data: existingAssets, loading } = useGetAssets(parseInt(id!, 10))

  const handleFormSubmit = useCallback(
    async (formData: AssetFormData) => {
      if (!id) return

      try {
        if (existingAssets?.getAssetsByProcedureId?.length > 0) {
          await Promise.all(
            existingAssets.getAssetsByProcedureId.map((asset: Asset) =>
              deleteAsset(parseInt(asset.id, 10))
            )
          )
        }
        const assets = mapFormDataToAssets(formData)
        await Promise.all(
          assets.map((asset) =>
            createAssetRequest({
              inheritanceProcedureId: parseInt(id, 10),
              value: 0,
              ...asset,
              type: asset.type as AssetType,
            })
          )
        )

        navigate(route.inheritanceProcedure(id))
      } catch (error) {
        console.error('Error managing assets:', error)
      }
    },
    [createAssetRequest, deleteAsset, id, navigate, existingAssets]
  )

  const defaultValues = useMemo(() => {
    if (!existingAssets?.getAssetsByProcedureId) return undefined

    const formData: AssetFormData = {}

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

    if (groupedAssets['Financial instrument']?.length > 0) {
      formData.bankAccount = {
        bank: groupedAssets['Financial instrument'].map(
          (asset: Asset) => asset.bankName || ''
        ),
      }
    }

    if (groupedAssets['Company']) {
      formData.company = groupedAssets['Company'].map((asset: Asset) => ({
        ico: asset.cin || '',
      }))
    }

    if (groupedAssets['Automobile']) {
      formData.car = groupedAssets['Automobile'].map((car: Asset) => ({
        brand: car.carMakeName || '',
        year: car.carRegistrationDate
          ? new Date(car.carRegistrationDate).getFullYear()
          : undefined,
        description: car.carType || '',
      }))
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
            isEditMode={isEditMode}
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

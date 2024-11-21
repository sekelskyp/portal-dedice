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
        if (existingAssets?.getAssetsByProcedureId?.length > 0) {
          await Promise.all(
            existingAssets.getAssetsByProcedureId.map((asset: Asset) =>
              deleteAsset(parseInt(asset.id, 10))
            )
          )
        }

        for (const asset of assets) {
          await createAssetRequest({
            inheritanceProcedureId: parseInt(id, 10),
            value: 0,
            ...asset,
          })
        }

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
        <HStack borderWidth={1} gap={6} borderRadius={4} py={4}>
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
    data.bankAccount.bank.forEach((bank) => {
      assets.push({
        type: 'Financial instrument',
        name: 'Bankovní účet',
        description: `Bankovní účet: ${bank}`,
        bankName: bank,
      })
    })
  }

  if (data.company?.length) {
    data.company.forEach((company) => {
      assets.push({
        type: 'Company',
        name: 'Obchodní společnost',
        description: `IČO: ${company.ico}`,
        cin: company.ico,
      })
    })
  }

  if (data.car?.length) {
    data.car.forEach((car) => {
      assets.push({
        type: 'Automobile',
        name: `Auto ${car.brand}`,
        description: car.description,
        carMakeName: car.brand,
        carType: car.description,
        carRegistrationDate: new Date(car.year!, 0, 1),
      })
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

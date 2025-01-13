import { useCallback, useMemo } from 'react'
import { Container, Heading, Spinner, Text, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { Asset } from '@frontend/gql/graphql'
import { Page } from '@frontend/shared/layout/Page'
import { route } from '@shared/route'

import { useProceedingContext } from '../../proceeding/components/ProceedingLayout'
import { AssetForm, AssetFormData } from '../components/AssetForm'
import { AssetType, useAddAsset } from '../hooks/useAddAsset'
import { useDeleteAsset } from '../hooks/useDeleteAsset'
import { mapAssetsToFormData, useGetAssets } from '../hooks/useGetAsset'

export const NewAssetPage = () => {
  const { proceedingId } = useProceedingContext()
  const navigate = useNavigate()
  const { addAsset: createAssetRequest } = useAddAsset()
  const { removeAsset } = useDeleteAsset(proceedingId)
  const { data: existingAssets, loading } = useGetAssets(proceedingId)

  const handleFormSubmit = useCallback(
    async (formData: AssetFormData) => {
      try {
        const newAssets = mapFormDataToAssets(formData)
        const existingAssetsList = existingAssets?.getAssetsByProceedingId || []
        await Promise.all(
          existingAssetsList.map((asset: Asset) =>
            removeAsset(parseInt(asset.id))
          )
        )
        await Promise.all(
          newAssets.map((asset) =>
            createAssetRequest({
              inheritanceProcedureId: proceedingId,
              ...asset,
              type: asset.type as AssetType,
              value: asset.value ?? 0,
            })
          )
        )

        navigate(route.proceeding(proceedingId.toString()))
      } catch (error) {
        throw error
      }
    },
    [createAssetRequest, removeAsset, proceedingId, navigate, existingAssets]
  )

  const defaultValues = useMemo(() => {
    const assets = existingAssets?.getAssetsByProceedingId
    if (!assets?.length) {
      return undefined
    }

    return mapAssetsToFormData(assets)
  }, [existingAssets])

  if (loading) {
    return (
      <Page>
        <Container centerContent>
          <Spinner />
        </Container>
      </Page>
    )
  }

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
            Majetek zůstavitele
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
            inheritanceProcedureId={proceedingId}
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
      assets.push({
        type: 'Financial instrument',
        name: `Bankovní účet`,
        description: `Bankovní účet ve ${bank}`,
        bankName: bank,
        value: 0,
      })
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

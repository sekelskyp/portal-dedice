import React, { useCallback } from 'react'
import { Container, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { useNavigate,useParams } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'

import { Page } from '@frontend/shared/layout/Page'
import { route } from '@shared/route'

import { useAddAsset } from '../hooks/useAddAsset'

import { AssetForm, AssetFormData } from './AssetForm'

export const NewAssetPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addAsset: createAssetRequest } = useAddAsset()
  const isMobile = useMediaQuery('(max-width: 768px)')

  const handleFormSubmit = useCallback((formData: AssetFormData) => {
    if (!id) {
      console.error('No procedure ID provided')
      return
    }

    const assets = mapFormDataToAssets(formData)
    
    const createAssets = async () => {
      for (const asset of assets) {
        try {
          await createAssetRequest({
            inheritanceProcedureId: parseInt(id, 10),
            value: 0,
            ...asset,
          })
        } catch (error) {
          console.error('Error creating asset:', error)
        }
      }
      navigate(route.inheritanceProcedure(id))
    }

    createAssets()
  }, [createAssetRequest, id, navigate])

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
    assets.push({
      type: 'Financial instrument',
      name: 'Bankovní účet',
      description: `Bankovní účty: ${data.bankAccount.bank.join(', ')}`,
      bankName: data.bankAccount.bank.join(', '),
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
      description: data.car.description,
      carMakeName: data.car.brand,
      carType: data.car.description,
      carRegistrationDate: new Date(data.car.year!, 0, 1),
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

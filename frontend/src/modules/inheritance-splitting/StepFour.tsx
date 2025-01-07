import { Box, Grid, GridItem, Heading, Text, VStack } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

import { FormData, StepProps } from './FormData'
import { StepNavigation } from './StepNavigation'

interface InheritanceShare {
  heirId: string
  heirLabel: string
  totalValue: number
  assets: Array<{
    name: string
    value: number
    percentage: number
  }>
}

export const StepFour = ({ onPrevious, onNext }: StepProps) => {
  const { watch } = useFormContext<FormData>()

  const assets = watch('assets') || []
  const heirs = watch('heirs') || []

  const sharedAssets = assets.filter(
    (asset) => asset.isShared && asset.sharedOwner === 'manžel/ka'
  )
  const sharedTotal = sharedAssets.reduce(
    (sum, asset) => sum + (Number(asset.value) || 0),
    0
  )
  const sharedHalf = sharedTotal / 2

  const calculateShares = (): InheritanceShare[] => {
    const shares: Record<string, InheritanceShare> = {}

    heirs.forEach((heir) => {
      shares[heir.id || ''] = {
        heirId: heir.id || '',
        heirLabel: heir.label,
        totalValue: heir.type === 'spouse' ? sharedHalf : 0,
        assets:
          heir.type === 'spouse'
            ? [
                {
                  name: 'Podíl ze SJM',
                  value: sharedHalf,
                  percentage: 50,
                },
              ]
            : [],
      }
    })

    assets.forEach((asset) => {
      if (asset.isShared && asset.sharedOwner === 'manžel/ka') return

      const value = Number(asset.value) || 0
      if (asset.heir === 'all') {
        const shareValue = value / heirs.length
        heirs.forEach((heir) => {
          const share = shares[heir.id || '']
          if (share) {
            share.totalValue += shareValue
            share.assets.push({
              name: asset.name,
              value: shareValue,
              percentage: 100 / heirs.length,
            })
          }
        })
      } else if (asset.heir) {
        const share = shares[asset.heir]
        if (share) {
          share.totalValue += value
          share.assets.push({
            name: asset.name,
            value: value,
            percentage: 100,
          })
        }
      }
    })

    return Object.values(shares)
  }

  const shares = calculateShares()
  const totalEstate = shares.reduce((sum, share) => sum + share.totalValue, 0)

  return (
    <VStack gap={6} align="stretch" w="full">
      {sharedTotal > 0 && (
        <Box p={4} bg="yellow.50" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold">
            Společné jmění manželů (SJM)
          </Text>
          <Text>Celková hodnota: {sharedTotal.toLocaleString()} Kč</Text>
          <Text>
            Polovina připadající pozůstalému manželovi:{' '}
            {sharedHalf.toLocaleString()} Kč
          </Text>
          <Text>
            Polovina vstupující do pozůstalosti: {sharedHalf.toLocaleString()}{' '}
            Kč
          </Text>
        </Box>
      )}

      <Box p={4} bg="blue.50" borderRadius="md">
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Celková hodnota pozůstalosti: {totalEstate.toLocaleString()} Kč
        </Text>
      </Box>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
        {shares.map((share) => (
          <GridItem key={share.heirId}>
            <VStack gap={4} align="stretch">
              <Box borderBottom="1px" borderColor="gray.200" pb={2}>
                <Heading size="md" color="blue.600">
                  {share.heirLabel}
                </Heading>
                <Text fontSize="lg" fontWeight="bold" color="green.600">
                  Celkem: {share.totalValue.toLocaleString()} Kč
                </Text>
                <Text fontSize="sm" color="gray.600">
                  ({((share.totalValue / totalEstate) * 100).toFixed(1)}% z
                  celku)
                </Text>
              </Box>

              <VStack gap={3} align="stretch">
                <Text fontWeight="medium" color="gray.700">
                  Získaný majetek:
                </Text>
                {share.assets.map((asset, idx) => (
                  <Box key={idx} pl={2}>
                    <Text>{asset.name}</Text>
                    <Text fontSize="sm" color="gray.600">
                      {asset.value.toLocaleString()} Kč (
                      {asset.percentage.toFixed(1)}%)
                    </Text>
                  </Box>
                ))}
              </VStack>
            </VStack>
          </GridItem>
        ))}
      </Grid>

      <StepNavigation
        onPrevious={onPrevious}
        onNext={onNext}
        isFirstStep={false}
        isLastStep={true}
      />
    </VStack>
  )
}

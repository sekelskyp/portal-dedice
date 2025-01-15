import { Box, Grid, Text, VStack } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

import {
  HeirShare,
  InheritanceShare,
  SjmShare,
  Transfer,
} from '../components/ShareCard'
import { StepNavigation } from '../components/StepNavigation'
import { FormData, StepProps } from '../data/FormData'

export const StepFour = ({ onPrevious, onNext }: StepProps) => {
  const { getValues } = useFormContext<FormData>()
  const assets = getValues().assets || []
  const heirs = getValues().heirs || []

  const spouse = heirs.find((heir) => heir.type === 'spouse')
  const sharedAssets = assets.filter((asset) => asset.isShared)
  const notSharedAsssets = assets.filter((a) => a.sharedOwner === 'pozůstalost')

  const sharedTotal = sharedAssets.reduce(
    (sum, asset) => sum + (Number(asset.value) || 0),
    0
  )
  const pozostalostTotal = notSharedAsssets.reduce(
    (sum, a) => sum + (Number(a.value) || 0),
    0
  )

  const expectedSpouseShare = sharedTotal / 2
  const sharedHalf = sharedAssets
    .filter(
      (asset) => asset.sharedOwner === 'manžel/ka' && asset.heir === spouse?.id
    )
    .reduce((sum, asset) => sum + (Number(asset.value) || 0), 0)

  const calculateShares = (): InheritanceShare[] => {
    const shares: Record<string, InheritanceShare> = {}

    heirs.forEach((heir) => {
      shares[heir.id || ''] = {
        heirId: heir.id || '',
        heirLabel: heir.label,
        totalValue: 0,
        assets: [],
      }
    })

    notSharedAsssets.forEach((asset) => {
      const value = Number(asset.value) || 0
      if (asset.heir === 'all') {
        const shareValue = value / heirs.length
        heirs.forEach((heir) => {
          const share = shares[heir.id || '']
          if (share) {
            share.totalValue += shareValue
            share.assets.push({
              name: asset.name || '',
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
            name: asset.name || '',
            value: value,
            percentage: 100,
          })
        }
      }
    })

    return Object.values(shares)
  }

  const calculateTransfers = (shares: InheritanceShare[]): Transfer[] => {
    const transfers: Transfer[] = []
    const equalShare = totalEstate / shares.length

    const sortedShares = [...shares].sort((a, b) => b.totalValue - a.totalValue)

    const differences = sortedShares.map((share) => ({
      heirId: share.heirId,
      heirLabel: share.heirLabel,
      difference: share.totalValue - equalShare,
    }))

    while (differences.some((d) => Math.abs(d.difference) > 1)) {
      const payer = differences.find((d) => d.difference > 0)
      const receiver = differences.find((d) => d.difference < 0)

      if (payer && receiver) {
        const transferAmount = Math.min(payer.difference, -receiver.difference)
        transfers.push({
          from: payer.heirId,
          to: receiver.heirId,
          amount: transferAmount,
        })

        payer.difference -= transferAmount
        receiver.difference += transferAmount
      }
    }

    return transfers
  }

  const shares = calculateShares()
  const totalEstate = shares.reduce((sum, share) => sum + share.totalValue, 0)
  const equalShare = totalEstate / shares.length
  const transfers = calculateTransfers(shares)

  return (
    <VStack gap={6} align="stretch" w="full">
      {sharedTotal > 0 && (
        <SjmShare
          totalValue={sharedTotal}
          expectedShare={expectedSpouseShare}
          actualShare={sharedHalf}
        />
      )}
      <Box p={4} bg="gray.50" borderRadius="md" boxShadow="sm">
        <Text fontSize="lg" fontWeight="bold">
          Celková hodnota pozůstalosti: {pozostalostTotal.toLocaleString()} Kč
        </Text>
      </Box>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
        {shares.map((share) => (
          <HeirShare
            key={share.heirId}
            share={share}
            totalEstate={totalEstate}
            equalShare={equalShare}
            transfers={transfers}
            targetPercentage={100 / shares.length}
            shares={shares}
          />
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

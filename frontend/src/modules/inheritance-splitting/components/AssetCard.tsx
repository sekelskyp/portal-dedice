import { Card, Grid, HStack, ListCollection, Text } from '@chakra-ui/react'

import { SelectFormControl } from '@frontend/shared/forms'

import { Asset, Heir } from '../FormData'

import { AssetDetailField } from './AssetDetailField'

interface AssetCardProps {
  asset: Asset
  index: number
  getHeirCollection: (isIndivisible: boolean) => ListCollection<Heir>
}

export const AssetCard = ({
  asset,
  index,
  getHeirCollection,
}: AssetCardProps) => (
  <Card.Root variant={'elevated'} px={4} py={3}>
    <Card.Body>
      <Card.Title mb={6}>{asset.type || 'Neuvedeno'}</Card.Title>
      <Grid templateColumns="repeat(4, 1fr)" rowGap={8}>
        <AssetDetailField label="Název" value={asset.name || 'Neuvedeno'} />
        <AssetDetailField
          label="Vlastnictví"
          value={asset.isShared ? 'Společné' : 'Individuální'}
        />
        <AssetDetailField
          label="Dělitelnost"
          value={
            asset.type.toLowerCase() === 'cenné papíry' ||
            asset.type.toLowerCase() === 'vozidlo'
              ? 'Ne'
              : 'Ano'
          }
        />
        <AssetDetailField label="Hodnota" value={`${asset.value || '0'} Kč`} />
        <HStack gridColumn="span 2" gap={2}>
          <Text whiteSpace="nowrap">* Návrh rozdělení:</Text>
          <SelectFormControl
            label=""
            name={`assets.${index}.heir`}
            collection={getHeirCollection(
              asset.type.toLowerCase() === 'cenné papíry' ||
                asset.type.toLowerCase() === 'vozidlo'
            )}
            placeholder="Vyberte dědice"
            required
          />
        </HStack>
      </Grid>
    </Card.Body>
  </Card.Root>
)

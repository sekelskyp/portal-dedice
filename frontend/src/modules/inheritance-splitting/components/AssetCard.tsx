import { useEffect } from 'react'
import {
  Card,
  Flex,
  Grid,
  HStack,
  ListCollection,
  Text,
} from '@chakra-ui/react'
import { createListCollection } from '@chakra-ui/react/collection'
import {
  Banknote,
  Building2,
  Car,
  Clock,
  CreditCard,
  Gem,
  Home,
  LineChart,
  PiggyBank,
} from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { SelectFormControl } from '@frontend/shared/forms'

import { Asset, FormData, Heir } from '../FormData'

import { AssetDetailField } from './AssetDetailField'

const sharedOwnerCollection = createListCollection({
  items: [
    { value: 'manžel/ka', label: 'Manžel/ka' },
    { value: 'pozůstalost', label: 'Pozůstalost' },
  ],
})

interface AssetCardProps {
  asset: Asset
  index: number
  getHeirCollection: (isIndivisible: boolean) => ListCollection<Heir>
}

interface IconMap {
  [key: string]: JSX.Element
}

const assetTypeToIcon: IconMap = {
  'běžný účet': <CreditCard size={32} />,
  'spořící účet': <PiggyBank size={32} />,
  'termínovaný vklad': <Clock size={32} />,
  'spoření na nemovitost': <Building2 size={32} />,
  'cenné papíry': <LineChart size={32} />,
  cennosti: <Gem size={32} />,
  hotovost: <Banknote size={32} />,
  vozidlo: <Car size={32} />,
  nemovitost: <Home size={32} />,
}

interface AssetIconProps {
  type: string
}

const AssetIcon = ({ type }: AssetIconProps) => {
  return assetTypeToIcon[type.toLocaleLowerCase()]
}

export const AssetCard = ({
  asset,
  index,
  getHeirCollection,
}: AssetCardProps) => {
  const { watch, setValue } = useFormContext<FormData>()
  const sharedOwner = watch(`assets.${index}.sharedOwner`)

  useEffect(() => {
    if (sharedOwner === 'manžel/ka') {
      const spouse = watch('heirs')?.find((heir) => heir.type === 'spouse')
      if (spouse?.id) {
        setValue(`assets.${index}.heir`, spouse.id)
      }
    }
  }, [sharedOwner, setValue, index, watch])

  return (
    <Card.Root variant={'elevated'} px={4} py={3}>
      <Card.Body>
        <Card.Title mb={6}>
          <Flex align="center" gap={4}>
            <AssetIcon type={asset.type} />
            {asset.type || 'Neuvedeno'}
          </Flex>
        </Card.Title>
        <Grid templateColumns="repeat(4, 1fr)" rowGap={8} columnGap={6}>
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
          <AssetDetailField
            label="Hodnota"
            value={`${asset.value || '0'} Kč`}
          />
          {asset.isShared && (
            <HStack gridColumn="span 2">
              <Text whiteSpace="nowrap" color="gray.600">
                Přiřadit k:
              </Text>
              <SelectFormControl
                label=""
                name={`assets.${index}.sharedOwner`}
                collection={sharedOwnerCollection}
                placeholder="Vyberte vlastníka"
                required
              />
            </HStack>
          )}
          <HStack gridColumn="span 2">
            <Text whiteSpace="nowrap" color="gray.600">
              * Návrh rozdělení:
            </Text>
            <SelectFormControl
              label=""
              name={`assets.${index}.heir`}
              collection={getHeirCollection(
                asset.type.toLowerCase() === 'cenné papíry' ||
                  asset.type.toLowerCase() === 'vozidlo'
              )}
              placeholder="Vyberte dědice"
              required
              disabled={sharedOwner === 'manžel/ka'}
            />
          </HStack>
        </Grid>
      </Card.Body>
    </Card.Root>
  )
}

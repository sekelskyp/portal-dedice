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
import { useFormContext } from 'react-hook-form'
import {
  BsBuildings,
  BsCarFront,
  BsCashStack,
  BsClockHistory,
  BsCreditCard,
  BsGem,
  BsGraphUp,
  BsHouseDoor,
  BsLightningCharge,
  BsPiggyBank,
} from 'react-icons/bs'

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
  'běžný účet': <BsCreditCard size={32} />,
  'spořící účet': <BsPiggyBank size={32} />,
  'termínovaný vklad': <BsClockHistory size={32} />,
  'stavební spoření': <BsBuildings size={32} />,
  'cenné papíry': <BsGraphUp size={32} />,
  'hotovost': <BsCashStack size={32} />,
  'vozidlo': <BsCarFront size={32} />,
  'nemovitost': <BsHouseDoor size={32} />,
  'přeplatky energií': <BsLightningCharge size={32} />,
  'cennosti': <BsGem size={32} />
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

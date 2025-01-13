import { useEffect } from 'react'
import { Box, Card, Flex, Grid, ListCollection, Text } from '@chakra-ui/react'
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

import { Asset, FormData, Heir } from '../data/FormData'

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
  hotovost: <BsCashStack size={32} />,
  vozidlo: <BsCarFront size={32} />,
  nemovitost: <BsHouseDoor size={32} />,
  'přeplatky energií': <BsLightningCharge size={32} />,
  cennosti: <BsGem size={32} />,
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
    <Card.Root variant={'elevated'} px={[3, 4]} py={[2, 3]}>
      <Card.Body>
        <Card.Title mb={[4, 6]}>
          <Flex
            align="center"
            gap={[2, 4]}
            flexDir={['column', 'row']}
            alignItems={['flex-start', 'center']}
          >
            <Box fontSize={['24px', '32px']}>
              <AssetIcon type={asset.type} />
            </Box>
            <Text>{asset.type || 'Neuvedeno'}</Text>
          </Flex>
        </Card.Title>
        <Grid
          templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(4, 1fr)']}
          rowGap={[4, 6]}
          columnGap={[3, 4]}
        >
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
            <Flex
              direction={['column', 'row']}
              gap={2}
              gridColumn={['1/-1', 'span 2']}
              alignItems={['flex-start', 'center']}
              mt={[2, 0]}
            >
              <Text whiteSpace="nowrap" color="gray.600" minW="fit-content">
                Vypořádání SJM:
              </Text>
              <Box flex="1">
                <SelectFormControl
                  label=""
                  name={`assets.${index}.sharedOwner`}
                  collection={sharedOwnerCollection}
                  placeholder="Vyberte vlastníka"
                  required
                />
              </Box>
            </Flex>
          )}
          <Flex
            direction={['column', 'row']}
            gap={2}
            gridColumn={['1/-1', 'span 2']}
            alignItems={['flex-start', 'center']}
            mt={[2, 0]}
          >
            <Text whiteSpace="nowrap" color="gray.600" minW="fit-content">
              * Rozdělení v pozůstalosti:
            </Text>
            <Box flex="1">
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
            </Box>
          </Flex>
        </Grid>
      </Card.Body>
    </Card.Root>
  )
}

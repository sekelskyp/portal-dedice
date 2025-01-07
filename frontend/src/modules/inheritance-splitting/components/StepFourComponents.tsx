import { Box, GridItem, Heading, Text, VStack } from '@chakra-ui/react'

export interface Asset {
  name: string
  value: number
  percentage: number
}

export interface InheritanceShare {
  heirId: string
  heirLabel: string
  totalValue: number
  assets: Asset[]
}

export interface Transfer {
  from: string
  to: string
  amount: number
}

export const HeirShare = ({
  share,
  totalEstate,
}: {
  share: InheritanceShare
  totalEstate: number
}) => (
  <GridItem>
    <VStack gap={4} align="stretch">
      <Box borderBottom="1px" borderColor="gray.200" pb={2}>
        <Heading size="md" color="blue.600">
          {share.heirLabel}
        </Heading>
        <Text fontSize="lg" fontWeight="bold" color="green.600">
          Celkem: {share.totalValue.toLocaleString()} Kč
        </Text>
        <Text fontSize="sm" color="gray.600">
          ({((share.totalValue / totalEstate) * 100).toFixed(1)}% z celku)
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
              {asset.value.toLocaleString()} Kč ({asset.percentage.toFixed(1)}%)
            </Text>
          </Box>
        ))}
      </VStack>
    </VStack>
  </GridItem>
)

export const TransfersList = ({
  transfers,
  shares,
  equalShare,
}: {
  transfers: Transfer[]
  shares: InheritanceShare[]
  equalShare: number
}) => (
  <Box p={4} bg="purple.50" borderRadius="md" mt={6}>
    <Heading size="md" mb={4}>
      Vyrovnání podílů
    </Heading>
    <Text mb={4}>
      Spravedlivý podíl pro každého: {equalShare.toLocaleString()} Kč
    </Text>

    {transfers.length > 0 ? (
      <VStack align="stretch" gap={2}>
        <Text fontWeight="bold" mb={2}>
          Potřebné převody:
        </Text>
        {transfers.map((transfer, index) => {
          const fromHeir = shares.find((s) => s.heirId === transfer.from)
          const toHeir = shares.find((s) => s.heirId === transfer.to)
          return (
            <Text key={index}>
              {fromHeir?.heirLabel} → {toHeir?.heirLabel}:{' '}
              {transfer.amount.toLocaleString()} Kč
            </Text>
          )
        })}
      </VStack>
    ) : (
      <Text>Všechny podíly jsou již vyrovnané.</Text>
    )}
  </Box>
)

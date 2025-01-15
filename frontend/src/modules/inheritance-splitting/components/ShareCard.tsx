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
  equalShare,
  transfers,
  targetPercentage,
  shares,
}: {
  share: InheritanceShare
  totalEstate: number
  equalShare: number
  transfers: Transfer[]
  targetPercentage: number
  shares: InheritanceShare[]
}) => (
  <GridItem>
    <Box p={4} bg="gray.50" borderRadius="md" boxShadow="sm">
      <VStack gap={4} align="stretch">
        <Box borderBottom="1px" borderColor="gray.200" pb={2}>
          <Heading size="md" color="blue.600">
            {share.heirLabel}
          </Heading>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="baseline"
            mt={1}
          >
            <VStack align="start" gap={1}>
              <Text fontSize="lg" fontWeight="bold" color="green.600">
                Celkem získavá: {share.totalValue.toLocaleString()} Kč
              </Text>
              <Text fontSize="sm" color="gray.600">
                Současný podíl:{' '}
                {((share.totalValue / totalEstate) * 100).toFixed(1)}%
              </Text>
              <Text fontSize="sm" color="blue.600">
                Cílový podíl: {targetPercentage.toFixed(1)}% (
                {equalShare.toLocaleString()} Kč)
              </Text>
            </VStack>
          </Box>
        </Box>

        <VStack gap={3} align="stretch">
          <Text fontWeight="medium" color="gray.700">
            Získaný majetek:
          </Text>
          {share.assets.map((asset, idx) => (
            <Box
              key={idx}
              p={2}
              bg="white"
              borderRadius="sm"
              borderLeft="4px"
              borderColor="blue.200"
            >
              <Text fontWeight="medium">{asset.name}</Text>
              <Text fontSize="sm" color="gray.600">
                {asset.value.toLocaleString()} Kč ({asset.percentage.toFixed(1)}
                %)
              </Text>
            </Box>
          ))}
        </VStack>

        {transfers.some(
          (t) => t.from === share.heirId || t.to === share.heirId
        ) && (
          <Box pt={2} borderTop="1px" borderColor="gray.200">
            <Text fontWeight="medium" color="purple.700" mb={2}>
              Potřebné převody:
            </Text>
            <VStack align="stretch" gap={1}>
              {transfers
                .filter((t) => t.from === share.heirId || t.to === share.heirId)
                .map((transfer, index) => {
                  const otherHeirId =
                    transfer.from === share.heirId ? transfer.to : transfer.from
                  const otherHeir = shares.find((s) => s.heirId === otherHeirId)
                  return (
                    <Text
                      key={index}
                      fontSize="sm"
                      color={
                        transfer.from === share.heirId ? 'red.600' : 'green.600'
                      }
                    >
                      {transfer.from === share.heirId
                        ? `Převést dědicovi ${otherHeir?.heirLabel}:`
                        : `Přijmout od dědice ${otherHeir?.heirLabel}:`}{' '}
                      {transfer.amount.toLocaleString()} Kč
                    </Text>
                  )
                })}
            </VStack>
          </Box>
        )}
      </VStack>
    </Box>
  </GridItem>
)

export const SjmShare = ({
  totalValue,
  expectedShare,
  actualShare,
}: {
  totalValue: number
  expectedShare: number
  actualShare: number
}) => (
  <Box p={4} bg="gray.50" borderRadius="md" boxShadow="sm">
    <VStack gap={4} align="stretch">
      <Box borderBottom="1px" borderColor="gray.200" pb={2}>
        <Heading size="md" color="blue.600">
          Společné jmění manželů (SJM)
        </Heading>
        <VStack align="start" gap={1} mt={2}>
          <Text fontSize="lg" fontWeight="bold" color="green.600">
            Celková hodnota: {totalValue.toLocaleString()} Kč
          </Text>
          <Text fontSize="sm" color="blue.600">
            Manžel/ka by z titulu vypořádaní SJM měla získat 1/2 hodnoty tedy:{' '}
            {expectedShare.toLocaleString()} Kč
          </Text>
          <Text
            fontSize="sm"
            color={actualShare === expectedShare ? 'green.600' : 'orange.600'}
          >
            Manžel/ka z titulu vyspořádaní SJM dle modelace získala:{' '}
            {actualShare.toLocaleString()} Kč
          </Text>
        </VStack>
      </Box>
    </VStack>
  </Box>
)

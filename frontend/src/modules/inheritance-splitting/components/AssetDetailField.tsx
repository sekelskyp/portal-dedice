import { HStack, Text } from '@chakra-ui/react'

interface AssetDetailFieldProps {
  label: string
  value: string | React.ReactNode
}

export const AssetDetailField = ({ label, value }: AssetDetailFieldProps) => (
  <HStack>
    <Text color="gray.600">{label}:</Text>
    <Text>{value}</Text>
  </HStack>
)

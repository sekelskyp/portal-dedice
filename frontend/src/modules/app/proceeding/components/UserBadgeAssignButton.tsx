import { Flex, HStack, Icon, Spinner, StackProps, Text } from '@chakra-ui/react'
import { PlusCircleIcon } from 'lucide-react'

export interface UserBadgeAssignButtonProps
  extends Omit<StackProps, 'children'> {
  text: string
  loading?: boolean
}

export const UserBadgeAssignButton = ({
  text,
  loading,
  ...rest
}: UserBadgeAssignButtonProps) => (
  <HStack
    gap={4}
    justifyContent={{ base: 'center', lg: 'left' }}
    borderRadius={6}
    px={2.5}
    color="fg"
    border="1px solid"
    borderColor="fg.muted/25"
    _hover={{
      bg: { _light: 'primary.600', _dark: 'primary.400' },
      color: 'white',
    }}
    transition="background 0.2s ease-in, color 0.4s ease-out"
    cursor="pointer"
    h={14}
    boxShadow="card"
    {...rest}
  >
    <Flex alignItems="center">
      {loading ? (
        <Spinner m={1.5} size="lg" />
      ) : (
        <Icon asChild height={11} w={11}>
          <PlusCircleIcon strokeWidth={0.5} />
        </Icon>
      )}
    </Flex>
    <Text fontWeight="400" fontStyle="normal">
      {text}
    </Text>
  </HStack>
)

import { Separator } from '@chakra-ui/react/separator'
import { Heading } from '@chakra-ui/react/typography'

import { Box } from '@frontend/shared/design-system/atoms'
import { Switch } from '@frontend/shared/design-system/atoms/chakra/switch'

interface SectionProps {
  title: string
  children: React.ReactNode
  selected: boolean
  setSelected: React.Dispatch<React.SetStateAction<boolean>>
  clearFields?: () => void
}

export const Section: React.FC<SectionProps> = ({
  title,
  children,
  selected,
  setSelected,
  clearFields,
}) => (
  <Box
    borderWidth="1px"
    borderRadius="lg"
    p={6}
    width="100%"
    minH="200px"
    display="flex"
    flexDirection="column"
    bg="white"
    shadow="sm"
  >
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={4}
    >
      <Heading as="h3" size="md">
        {title}
      </Heading>
    </Box>
    <Separator mb={4} />
    <Box p={2} display="flex" alignItems="center" mb={4}>
      <Box mr={3}>Ano</Box>
      <Switch
        checked={selected}
        onChange={() => {
          setSelected((prev) => !prev)
          if (!selected && clearFields) {
            clearFields()
          }
        }}
      />
      <Box ml={3}>Ne</Box>
    </Box>
    <Box flex={1}>{!selected && children}</Box>
  </Box>
)

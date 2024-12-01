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
  hideSwitch?: boolean
}

export const Section: React.FC<SectionProps> = ({
  title,
  children,
  selected,
  setSelected,
  clearFields,
  hideSwitch,
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
    transition="all 0.2s"
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
    {!hideSwitch && (
      <Box p={2} display="flex" alignItems="center" mb={4}>
        <Box mr={3}>Ne</Box>
        <Switch
          checked={!selected}
          onChange={() => {
            setSelected(!selected)
            if (selected && clearFields) {
              clearFields()
            }
          }}
          transition="opacity 0.2s"
        />
        <Box ml={3}>Ano</Box>
      </Box>
    )}
    <Box
      flex={1}
      visibility={selected ? 'hidden' : 'visible'}
      opacity={selected ? 0 : 1}
      transition="all 0.2s"
      transform={selected ? 'translateY(-10px)' : 'translateY(0)'}
    >
      {children}
    </Box>
  </Box>
)

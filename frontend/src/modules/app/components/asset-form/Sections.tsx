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
  <Box>
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Heading as={'h3'}>{title}</Heading>
    </Box>
    <Separator mb={2} />
    <Box p={1} m={2} display="flex" alignItems="center">
      <Box mr={2}>Ano</Box>
      <Switch
        checked={selected}
        onChange={() => {
          setSelected((prev) => !prev)
          if (!selected && clearFields) {
            clearFields()
          }
        }}
      />
      <Box ml={2}>Ne</Box>
    </Box>
    {!selected && children}
  </Box>
)

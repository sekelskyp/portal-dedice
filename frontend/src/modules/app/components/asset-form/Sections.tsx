import React, { useCallback } from 'react'
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

export const Section: React.FC<SectionProps> = React.memo(
  ({ title, children, selected, setSelected, clearFields, hideSwitch }) => {
    const handleSwitchChange = useCallback(() => {
      if (clearFields && !selected) {
        clearFields()
      }
      setSelected(!selected)
    }, [clearFields, selected, setSelected])

    return (
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
        {!hideSwitch && (
          <Box p={2} display="flex" alignItems="center" mb={4}>
            <Box mr={3}>Ano</Box>
            <Switch checked={!selected} onChange={handleSwitchChange} />
            <Box ml={3}>Ne</Box>
          </Box>
        )}
        <Box flex={1}>{selected ? null : children}</Box>
      </Box>
    )
  },
  (prevProps, nextProps) =>
    prevProps.selected === nextProps.selected &&
    prevProps.hideSwitch === nextProps.hideSwitch
)

Section.displayName = 'Section'

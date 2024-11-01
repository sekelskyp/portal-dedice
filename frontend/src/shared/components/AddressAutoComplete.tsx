import { forwardRef, useMemo, useState } from 'react'
import { Combobox, createListCollection } from '@ark-ui/react/combobox'
import { Portal } from '@ark-ui/react/portal'
import {
  Box,
  Card,
  HStack,
  Input,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { FiChevronDown, FiX } from 'react-icons/fi'

import { Button, InputGroup } from '../design-system'
import useAddressSuggestions, {
  Suggestion,
} from '../hooks/useAddressSuggestions'

type PlacesAutoCompleteProps = {
  value?: Suggestion
  onChange: (value?: Suggestion) => void
  disabled?: boolean
}

export const AddressAutoComplete = forwardRef(
  ({ value, onChange, disabled }: PlacesAutoCompleteProps, ref) => {
    const [query, setQuery] = useState(value?.name ?? '')
    const { suggestions, loading, error } = useAddressSuggestions(query, {
      lang: 'cs',
      limit: 5,
      enable: query.length > 3,
    })

    const collection = useMemo(
      () =>
        createListCollection({
          items: suggestions.map((x) => ({
            label: x.name + ', ' + x.location,
            value: x,
          })),
        }),
      [suggestions]
    )

    return (
      <Box asChild w="full" ref={ref}>
        <Combobox.Root
          collection={collection}
          inputValue={query}
          onInputValueChange={(value) => {
            if (value.inputValue === query) return

            setQuery(value.inputValue)
          }}
          onValueChange={(details) => {
            const suggestion = details.value[0] as unknown as Suggestion

            setQuery(suggestion.name)
            onChange(suggestion)
          }}
          disabled={disabled}
        >
          <Combobox.Control>
            <InputGroup
              w="full"
              endElement={
                <HStack mr={-2} gap={1}>
                  <Combobox.ClearTrigger asChild>
                    <Button size="xs" variant="ghost" px={1}>
                      <FiX />
                    </Button>
                  </Combobox.ClearTrigger>
                  <Combobox.Trigger asChild>
                    <Button size="xs" variant="ghost" px={1} disabled={!error}>
                      {loading ? <Spinner size="sm" /> : <FiChevronDown />}
                    </Button>
                  </Combobox.Trigger>
                </HStack>
              }
            >
              <Combobox.Input asChild>
                <Input disabled={disabled} />
              </Combobox.Input>
            </InputGroup>
          </Combobox.Control>
          <Portal>
            <Combobox.Positioner>
              <Combobox.Content>
                {query.length > 3 && (
                  <Card.Root>
                    <Card.Body p={0}>
                      <Stack gap={1}>
                        {collection.items.map((item) => (
                          <Combobox.Item key={item.label} item={item}>
                            <Combobox.ItemText>{item.label}</Combobox.ItemText>
                          </Combobox.Item>
                        ))}
                        {collection.items.length === 0 && (
                          <Text p={4}>Adresa nebyla nalezena.</Text>
                        )}
                      </Stack>
                    </Card.Body>
                  </Card.Root>
                )}
              </Combobox.Content>
            </Combobox.Positioner>
          </Portal>
        </Combobox.Root>
      </Box>
    )
  }
)

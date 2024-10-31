import { forwardRef, useState } from 'react'
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
  defaultInputValue?: string
  onAddressChange: (value?: Suggestion) => void
  disabled?: boolean
}

export const PlacesAutoComplete = forwardRef(
  (
    { defaultInputValue, onAddressChange, disabled }: PlacesAutoCompleteProps,
    ref
  ) => {
    const [inputChangedByTyping, setInputChangedByTyping] = useState(false)
    const [query, setQuery] = useState(defaultInputValue ?? '')
    const { suggestions, loading, error } = useAddressSuggestions(query, {
      lang: 'cs',
      limit: 5,
      enable: inputChangedByTyping,
    })

    const collection = createListCollection({
      items: !error ? suggestions : [],
    })

    function handleSelect(selectedSuggestion?: Suggestion): void {
      console.log('selectedSuggestion', selectedSuggestion)
      setQuery(selectedSuggestion?.name ?? '')
      setInputChangedByTyping(false)
      onAddressChange(selectedSuggestion)
    }

    return (
      <Box asChild w="full" ref={ref}>
        <Combobox.Root
          collection={collection}
          onInputValueChange={(value) => {
            setQuery(value.inputValue)
            setInputChangedByTyping(true)
          }}
          onValueChange={(value) => handleSelect(value.items[0])}
          inputValue={query}
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
                {!error && query.length > 3 && (
                  <Card.Root>
                    <Card.Body p={0}>
                      <Stack gap={1}>
                        {collection.items.map((item, index) => (
                          <Combobox.Item key={index} item={item} asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              justifyContent={'space-between'}
                              pos={'relative'}
                            >
                              <Combobox.ItemText asChild>
                                <Text overflow="hidden" textOverflow="ellipsis">
                                  {item.name} {item.location}
                                </Text>
                              </Combobox.ItemText>
                            </Button>
                          </Combobox.Item>
                        ))}
                        {suggestions.length === 0 && (
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

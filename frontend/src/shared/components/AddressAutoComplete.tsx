import { forwardRef, useEffect, useMemo, useState } from 'react'
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
  onChange: (value?: Suggestion | undefined) => void
  disabled?: boolean
}

export const AddressAutoComplete = forwardRef(
  ({ value, onChange, disabled, ...props }: PlacesAutoCompleteProps, ref) => {
    const [query, setQuery] = useState(value?.name ?? '')
    const { suggestions, loading } = useAddressSuggestions(query, {
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

    useEffect(() => {
      setQuery(value?.name ?? '')
    }, [value?.name])

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
            if (details.value.length === 0) {
              setQuery('')
              onChange?.(undefined)
            } else {
              const suggestion = details.value[0] as unknown as Suggestion
              setQuery(suggestion.name)
              onChange(suggestion)
            }
          }}
          disabled={disabled}
          {...props}
        >
          <Combobox.Control>
            <InputGroup
              w="full"
              endElement={
                <HStack mr={-2} gap={1}>
                  {query && (
                    <Button
                      size="xs"
                      variant="ghost"
                      px={1}
                      onClick={() => {
                        setQuery('')
                        onChange?.(undefined)
                      }}
                    >
                      <FiX />
                    </Button>
                  )}
                  <Combobox.Trigger asChild>
                    <Button size="xs" variant="ghost" px={1}>
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
                            <Combobox.ItemText>
                              <Button
                                variant="ghost"
                                w="full"
                                justifyContent="start"
                              >
                                {item.label}
                              </Button>
                            </Combobox.ItemText>
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

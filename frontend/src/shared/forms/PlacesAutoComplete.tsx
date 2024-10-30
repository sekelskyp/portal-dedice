import { Combobox, createListCollection } from '@ark-ui/react/combobox'
import { Portal } from '@ark-ui/react/portal'
import { Box, Card, HStack, Input, Stack, Text } from '@chakra-ui/react'
import { useController } from 'react-hook-form'
import { FiChevronDown, FiX } from 'react-icons/fi'
import usePlacesAutocomplete, { getDetails } from 'use-places-autocomplete'

import { Button, InputGroup } from '../design-system'

type PlacesAutoCompleteProps = {
  name: string
}

export function PlacesAutoComplete({ name }: PlacesAutoCompleteProps) {
  const { field } = useController({ name })

  const {
    ready,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: 'initMap',
    requestOptions: {
      /* Define search scope here */
      language: 'cs',
      componentRestrictions: {
        country: 'CZ',
        types: ['address'],
      },
    },
    debounce: 300,
  })

  const handleSelect = ({
    place_id,
    description,
  }: {
    place_id: string
    description: string
  }) => {
    getDetails({ placeId: place_id }).then((data) => {
      setValue(data.formatted_address, false)
      field.onChange(description)
      clearSuggestions()
    })
  }

  const collection = createListCollection({
    items: (status === 'OK' ? data : []).map(
      ({ place_id, description, ...rest }) => ({
        place_id,
        description,
      })
    ),
  })

  return (
    <Box asChild w="full">
      <Combobox.Root
        collection={collection}
        onInputValueChange={(value) => setValue(value.inputValue)}
        onValueChange={(value) => handleSelect(value.items[0])}
        disabled={!ready}
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
                  <Button
                    size="xs"
                    variant="ghost"
                    px={1}
                    disabled={!ready || !status}
                  >
                    <FiChevronDown />
                  </Button>
                </Combobox.Trigger>
              </HStack>
            }
          >
            <Combobox.Input asChild>
              <Input />
            </Combobox.Input>
          </InputGroup>
        </Combobox.Control>
        <Portal>
          <Combobox.Positioner>
            <Combobox.Content>
              {status && (
                <Card.Root>
                  <Card.Body p={0}>
                    <Stack gap={1}>
                      {collection.items.map((item) => (
                        <Combobox.Item key={item.place_id} item={item} asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            justifyContent={'space-between'}
                            pos={'relative'}
                          >
                            <Combobox.ItemText asChild>
                              <Text overflow="hidden" textOverflow="ellipsis">
                                {item.description}
                              </Text>
                            </Combobox.ItemText>
                            <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
                          </Button>
                        </Combobox.Item>
                      ))}
                      {status === 'ZERO_RESULTS' && (
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

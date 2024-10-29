import { Combobox, createListCollection } from '@ark-ui/react/combobox'
import { Portal } from '@ark-ui/react/portal'
import { Box, Card, HStack, Input, Stack, Text } from '@chakra-ui/react'
import { useController } from 'react-hook-form'
import { FiChevronDown, FiX } from 'react-icons/fi'
import usePlacesAutocomplete from 'use-places-autocomplete'

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
      },
    },
    debounce: 300,
  })

  const onChange = (value: string) => {
    setValue(value)
    field.onChange(value)
  }

  const handleSelect = (address: string) => {
    setValue(address, false)
    field.onChange(address)
    clearSuggestions()
  }

  const collection = createListCollection({
    items: (status === 'OK' ? data : []).map(({ place_id, description }) => ({
      value: place_id,
      label: description,
    })),
  })

  return (
    <Box asChild w="full">
      <Combobox.Root
        collection={collection}
        inputValue={field.value}
        onInputValueChange={(value) => onChange(value.inputValue)}
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
                        <Combobox.Item
                          key={item.value}
                          item={item}
                          asChild
                          onClick={() => handleSelect(item.label)}
                        >
                          <Button
                            size="sm"
                            variant="ghost"
                            justifyContent={'space-between'}
                            pos={'relative'}
                          >
                            <Combobox.ItemText asChild>
                              <Text overflow="hidden" textOverflow="ellipsis">
                                {item.label}
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

// <AutoComplete openOnFocus>
// <AutoCompleteInput
//   name={name}
//   placeholder="Zadejte adresu..."
//   isDisabled={!ready}
//   onChange={(e) => {
//     handleInput(e)
//     onChange(e.target.value)
//   }}
//   value={value || ''}
// />
// <AutoCompleteList>
//   {status === 'OK' &&
//     data.map(({ place_id, description }) => (
//       <AutoCompleteItem
//         key={place_id}
//         value={description}
//         onClick={() => handleSelect(description, onChange)}
//       >
//         {description}
//       </AutoCompleteItem>
//     ))}
// </AutoCompleteList>
// {errors[name] && (
//   <FormErrorMessage>
//     {errors[name]?.message?.toString()}
//   </FormErrorMessage>
// )}
// </AutoComplete>

import { forwardRef, useMemo } from 'react'
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

import { AddressSuggestion } from '@frontend/gql/graphql'

import { Button, InputGroup } from '../design-system'
import useAddressSuggestions from '../hooks/useAddressSuggestions'

type PlacesAutoCompleteProps = {
  value?: string
  onChange: (value?: string | undefined) => void
  disabled?: boolean
  onSuggestionSelected: (suggestion?: AddressSuggestion) => void
}

export const AddressAutoComplete = forwardRef(
  (
    {
      value,
      onChange,
      disabled,
      onSuggestionSelected,
      ...props
    }: PlacesAutoCompleteProps,
    ref
  ) => {
    const { suggestions, loading } = useAddressSuggestions(value ?? '')

    const collection = useMemo(
      () =>
        createListCollection({
          items: suggestions.map((x) => ({
            label:
              x.street +
              ' ' +
              x.streetNumber +
              ', ' +
              x.postalCode +
              ' ' +
              x.municipality,
            value: x,
          })),
        }),
      [suggestions]
    )

    return (
      <Box asChild w="full" ref={ref}>
        <Combobox.Root
          collection={collection}
          inputValue={value ?? ''}
          onValueChange={(e) => {
            if (e.value.length !== 0) {
              const suggestion = e.value[0] as unknown as AddressSuggestion
              onChange(suggestion.street)
              onSuggestionSelected?.(suggestion)
            }
          }}
          disabled={disabled}
          allowCustomValue
          {...props}
        >
          <Combobox.Control>
            <InputGroup
              w="full"
              endElement={
                <HStack mr={-2} gap={1}>
                  {value && (
                    <Button
                      size="xs"
                      variant="ghost"
                      px={1}
                      onClick={() => {
                        onChange('')
                        onSuggestionSelected?.(undefined)
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
              <Combobox.Input
                asChild
                onChange={(e) => onChange(e.target.value)}
              >
                <Input disabled={disabled} />
              </Combobox.Input>
            </InputGroup>
          </Combobox.Control>
          <Portal>
            <Combobox.Positioner>
              <Combobox.Content>
                {(value ?? '').length > 3 && (
                  <Card.Root variant="elevated">
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

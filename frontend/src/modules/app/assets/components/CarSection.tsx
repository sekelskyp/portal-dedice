import React from 'react'
import { Box, Button, HStack, Stack, VStack } from '@chakra-ui/react'
import { createListCollection } from '@chakra-ui/react/collection'
import { Controller } from 'react-hook-form'
import { FaPlus, FaTimes, FaTrash } from 'react-icons/fa'

import resources from '@frontend/resources'
import { InputFormControl } from '@frontend/shared/forms/InputFormControl'
import { SelectFormControl } from '@frontend/shared/forms/SelectFormControl'

import { useAssetSection } from '../hooks/useAssetSection'

import { Section } from './Sections'

interface CarSectionProps {
  selected: boolean
  setSelected: React.Dispatch<React.SetStateAction<boolean>>
  bankAccountCollection: { id: string; name: string }[]
}

const carBrandCollection = createListCollection({
  items: [
    { value: 'Škoda', label: 'Škoda' },
    { value: 'BMW', label: 'BMW' },
    { value: 'Audi', label: 'Audi' },
    { value: 'Mercedes-Benz', label: 'Mercedes-Benz' },
    { value: 'Volkswagen', label: 'Volkswagen' },
    { value: 'Toyota', label: 'Toyota' },
    { value: 'Honda', label: 'Honda' },
    { value: 'Ford', label: 'Ford' },
    { value: 'Chevrolet', label: 'Chevrolet' },
    { value: 'Nissan', label: 'Nissan' },
    { value: 'Hyundai', label: 'Hyundai' },
    { value: 'Kia', label: 'Kia' },
    { value: 'Peugeot', label: 'Peugeot' },
    { value: 'Renault', label: 'Renault' },
    { value: 'Fiat', label: 'Fiat' },
    { value: 'Citroën', label: 'Citroën' },
    { value: 'Mazda', label: 'Mazda' },
    { value: 'Subaru', label: 'Subaru' },
    { value: 'Mitsubishi', label: 'Mitsubishi' },
    { value: 'Suzuki', label: 'Suzuki' },
    { value: 'Volvo', label: 'Volvo' },
    { value: 'Jaguar', label: 'Jaguar' },
    { value: 'Land Rover', label: 'Land Rover' },
    { value: 'Porsche', label: 'Porsche' },
    { value: 'Tesla', label: 'Tesla' },
    { value: 'Lexus', label: 'Lexus' },
    { value: 'Infiniti', label: 'Infiniti' },
    { value: 'Acura', label: 'Acura' },
    { value: 'Alfa Romeo', label: 'Alfa Romeo' },
    { value: 'Aston Martin', label: 'Aston Martin' },
    { value: 'Bentley', label: 'Bentley' },
    { value: 'Bugatti', label: 'Bugatti' },
    { value: 'Cadillac', label: 'Cadillac' },
    { value: 'Chrysler', label: 'Chrysler' },
    { value: 'Dodge', label: 'Dodge' },
    { value: 'Ferrari', label: 'Ferrari' },
    { value: 'Genesis', label: 'Genesis' },
    { value: 'GMC', label: 'GMC' },
    { value: 'Hummer', label: 'Hummer' },
    { value: 'Jeep', label: 'Jeep' },
    { value: 'Lamborghini', label: 'Lamborghini' },
    { value: 'Lincoln', label: 'Lincoln' },
    { value: 'Maserati', label: 'Maserati' },
    { value: 'McLaren', label: 'McLaren' },
    { value: 'Mini', label: 'Mini' },
    { value: 'Pagani', label: 'Pagani' },
    { value: 'Rolls-Royce', label: 'Rolls-Royce' },
    { value: 'Saab', label: 'Saab' },
    { value: 'Smart', label: 'Smart' },
    { value: 'Tata', label: 'Tata' },
    { value: 'Vauxhall', label: 'Vauxhall' },
  ],
})

export const CarSection: React.FC<CarSectionProps> = ({
  selected,
  setSelected,
}) => {
  const { fields, append, remove, setValue, watch } = useAssetSection(
    'car',
    selected,
    { brand: '', year: '', description: '' }
  )

  const hasExistingData = fields.length > 0

  return (
    <Section
      title={resources.portal.forms.assetForm.groups.car}
      selected={selected}
      setSelected={setSelected}
      clearFields={() =>
        setValue('car', [{ brand: '', year: '', description: '' }], {
          shouldValidate: true,
        })
      }
      hideSwitch={hasExistingData}
    >
      {!selected && (
        <>
          {fields.map((field, index) => (
            <React.Fragment key={field.id}>
              <VStack gap={4} width="100%" mb={4}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  width="100%"
                  alignItems="flex-start"
                  gap={4}
                >
                  <Box
                    position="relative"
                    width={{ base: '100%', sm: 'auto' }}
                    flex={{ sm: '1' }}
                  >
                    <SelectFormControl
                      name={`car.${index}.brand`}
                      label="Auto"
                      collection={carBrandCollection}
                      placeholder="Vyberte značku auta"
                      required
                    />
                    {watch(`car.${index}.brand`) && (
                      <Button
                        position="absolute"
                        right="8"
                        top="70%"
                        transform="translateY(-50%)"
                        size="xs"
                        variant="ghost"
                        p={1}
                        minW="auto"
                        h="auto"
                        color="gray.500"
                        _hover={{ color: 'gray.700' }}
                        onClick={() => setValue(`car.${index}.brand`, '')}
                      >
                        <FaTimes size="10px" />
                      </Button>
                    )}
                  </Box>
                  <Controller
                    name={`car.${index}.year`}
                    render={({ field }) => (
                      <InputFormControl
                        {...field}
                        label="Rok registrace"
                        placeholder="Rok"
                        width={{ base: '50%', sm: '30%' }}
                        required
                      />
                    )}
                  />
                </Stack>
                <Controller
                  name={`car.${index}.description`}
                  render={({ field }) => (
                    <InputFormControl
                      {...field}
                      label="Popis"
                      placeholder="Zadejte popis auta"
                      width="100%"
                      required
                    />
                  )}
                />
                <HStack width="100%" justifyContent="space-between">
                  <Button
                    onClick={() =>
                      append({ brand: '', year: '', description: '' })
                    }
                    size="sm"
                  >
                    <FaPlus />
                  </Button>
                  {fields.length > 1 && (
                    <Button
                      aria-label="Remove car"
                      onClick={() => remove(index)}
                      bg="red.500"
                      size="sm"
                    >
                      <FaTrash />
                    </Button>
                  )}
                </HStack>
              </VStack>
            </React.Fragment>
          ))}
        </>
      )}
    </Section>
  )
}

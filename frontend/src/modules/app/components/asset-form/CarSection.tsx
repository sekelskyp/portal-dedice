import React from 'react'
import { Button, HStack, VStack } from '@chakra-ui/react'
import { createListCollection } from '@chakra-ui/react/collection'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { FaPlus, FaTrash } from 'react-icons/fa'

import resources from '@frontend/resources'
import { InputFormControl } from '@frontend/shared/forms/InputFormControl'
import { SelectFormControl } from '@frontend/shared/forms/SelectFormControl'

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
  const { setValue, control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'car',
  })

  const clearFields = () => {
    setValue('car', [])
  }

  return (
    <Section
      title={resources.portal.forms.assetForm.groups.car}
      selected={selected}
      setSelected={setSelected}
      clearFields={clearFields}
    >
      {!selected && (
        <>
          {fields.map((field, index) => (
            <React.Fragment key={field.id}>
              <HStack alignItems="flex-start">
                <VStack flex={1}>
                  <Controller
                    name={`car.${index}.brand`}
                    render={({ field }) => (
                      <SelectFormControl
                        {...field}
                        label="Auto"
                        collection={carBrandCollection}
                        placeholder="Vyberte značku auta"
                      />
                    )}
                  />
                  <Controller
                    name={`car.${index}.year`}
                    render={({ field }) => (
                      <InputFormControl
                        {...field}
                        label="Rok registrace"
                        type="number"
                        placeholder="Zadejte rok registrace"
                      />
                    )}
                  />
                  <Controller
                    name={`car.${index}.description`}
                    render={({ field }) => (
                      <InputFormControl
                        {...field}
                        label="Popis"
                        placeholder="Zadejte popis auta"
                      />
                    )}
                  />
                </VStack>
              </HStack>
              <HStack my={2} justifyContent={'space-between'}>
                <Button
                  onClick={() =>
                    append({ brand: '', year: '', description: '' })
                  }
                  width="fit-content"
                >
                  <FaPlus />
                </Button>
                {fields.length > 1 && (
                  <Button
                    aria-label="Remove car"
                    bg={'red'}
                    onClick={() => remove(index)}
                  >
                    <FaTrash />
                  </Button>
                )}
              </HStack>
            </React.Fragment>
          ))}
        </>
      )}
    </Section>
  )
}

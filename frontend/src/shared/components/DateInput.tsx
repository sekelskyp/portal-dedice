import { ForwardedRef, forwardRef } from 'react'
import { DatePicker, DatePickerRootProps } from '@ark-ui/react/date-picker'
import { Portal } from '@ark-ui/react/portal'
import { Box, Card, HStack, Input, Stack } from '@chakra-ui/react'
import { fromDate } from '@internationalized/date'
import { FiCalendar, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'

import {
  Button,
  InputGroup,
  NativeSelectField,
  NativeSelectRoot,
} from '../design-system'

export interface DateInputProps
  extends Omit<DatePickerRootProps, 'value' | 'onChange' | 'name'> {
  showTime?: boolean
  value?: Date
  onChange?: (value: Date | undefined) => void
  onBlur?: () => void
  disabled?: boolean
}
export const DateInput = forwardRef(
  (
    { value, onChange, ...props }: DateInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const dateValue = value ? [fromDate(value, 'UTC')] : []

    return (
      <Box asChild w={'full'}>
        <DatePicker.Root
          locale="cs-CZ"
          value={dateValue}
          onValueChange={(value) => {
            onChange?.(value.value[0]?.toDate('UTC') ?? null)
          }}
          {...props}
        >
          <DatePicker.Control>
            <InputGroup
              w="full"
              endElement={
                <HStack mr={-2} gap={1}>
                  <DatePicker.ClearTrigger asChild>
                    <Button size="xs" variant="ghost">
                      <FiX />
                    </Button>
                  </DatePicker.ClearTrigger>
                  <DatePicker.Trigger asChild>
                    <Button size="xs" variant="ghost">
                      <FiCalendar />
                    </Button>
                  </DatePicker.Trigger>
                </HStack>
              }
            >
              <DatePicker.Input asChild>
                <Input ref={ref} readOnly placeholder="Vyberte datum" />
              </DatePicker.Input>
            </InputGroup>
          </DatePicker.Control>
          <Portal>
            <DatePicker.Positioner>
              <DatePicker.Content>
                <DatePicker.View view="day">
                  <DatePicker.Context>
                    {(datePicker) => (
                      <Card.Root variant="elevated">
                        <Card.Body as={Stack} gap={4} p={3}>
                          <HStack>
                            <NativeSelectRoot size="xs" variant="plain">
                              <NativeSelectField
                                {...datePicker.getMonthSelectProps()}
                              >
                                {datePicker.getMonths().map((month, id) => (
                                  <option key={id} value={month.value}>
                                    {month.label}
                                  </option>
                                ))}
                              </NativeSelectField>
                            </NativeSelectRoot>
                            <NativeSelectRoot size="xs" variant="plain">
                              <NativeSelectField
                                {...datePicker.getYearSelectProps()}
                              >
                                {datePicker.getYears().map((month, id) => (
                                  <option key={id} value={month.value}>
                                    {month.label}
                                  </option>
                                ))}
                              </NativeSelectField>
                            </NativeSelectRoot>
                          </HStack>
                          <DatePicker.ViewControl>
                            <HStack justifyContent="space-between">
                              <DatePicker.PrevTrigger asChild>
                                <Button size="2xs" variant="ghost">
                                  <FiChevronLeft />
                                </Button>
                              </DatePicker.PrevTrigger>
                              <DatePicker.ViewTrigger>
                                <DatePicker.RangeText />
                              </DatePicker.ViewTrigger>
                              <DatePicker.NextTrigger asChild>
                                <Button size="2xs" variant="ghost">
                                  <FiChevronRight />
                                </Button>
                              </DatePicker.NextTrigger>
                            </HStack>
                          </DatePicker.ViewControl>
                          <DatePicker.Table>
                            <DatePicker.TableHead>
                              <DatePicker.TableRow>
                                {datePicker.weekDays.map((weekDay, id) => (
                                  <DatePicker.TableHeader key={id}>
                                    {weekDay.short}
                                  </DatePicker.TableHeader>
                                ))}
                              </DatePicker.TableRow>
                            </DatePicker.TableHead>
                            <DatePicker.TableBody>
                              {datePicker.weeks.map((week, id) => (
                                <DatePicker.TableRow key={id}>
                                  {week.map((day, id) => (
                                    <DatePicker.TableCell key={id} value={day}>
                                      <DatePicker.TableCellTrigger asChild>
                                        <Button
                                          size="2xs"
                                          variant={
                                            datePicker.value[0]?.compare(
                                              day
                                            ) === 0
                                              ? 'solid'
                                              : 'ghost'
                                          }
                                        >
                                          {day.day}
                                        </Button>
                                      </DatePicker.TableCellTrigger>
                                    </DatePicker.TableCell>
                                  ))}
                                </DatePicker.TableRow>
                              ))}
                            </DatePicker.TableBody>
                          </DatePicker.Table>
                        </Card.Body>
                      </Card.Root>
                    )}
                  </DatePicker.Context>
                </DatePicker.View>
                <DatePicker.View view="month">
                  <DatePicker.Context>
                    {(datePicker) => (
                      <Card.Root variant="elevated">
                        <Card.Body as={Stack} gap={4} p={3}>
                          <HStack>
                            <NativeSelectRoot size="xs" variant="plain">
                              <NativeSelectField
                                {...datePicker.getMonthSelectProps()}
                              >
                                {datePicker.getMonths().map((month, id) => (
                                  <option key={id} value={month.value}>
                                    {month.label}
                                  </option>
                                ))}
                              </NativeSelectField>
                            </NativeSelectRoot>
                            <NativeSelectRoot size="xs" variant="plain">
                              <NativeSelectField
                                {...datePicker.getYearSelectProps()}
                              >
                                {datePicker.getYears().map((month, id) => (
                                  <option key={id} value={month.value}>
                                    {month.label}
                                  </option>
                                ))}
                              </NativeSelectField>
                            </NativeSelectRoot>
                          </HStack>
                          <DatePicker.ViewControl>
                            <HStack justifyContent="space-between">
                              <DatePicker.PrevTrigger asChild>
                                <Button size="2xs" variant="ghost">
                                  <FiChevronLeft />
                                </Button>
                              </DatePicker.PrevTrigger>
                              <DatePicker.ViewTrigger>
                                <DatePicker.RangeText />
                              </DatePicker.ViewTrigger>
                              <DatePicker.NextTrigger asChild>
                                <Button size="2xs" variant="ghost">
                                  <FiChevronRight />
                                </Button>
                              </DatePicker.NextTrigger>
                            </HStack>
                          </DatePicker.ViewControl>
                          <DatePicker.Table>
                            <DatePicker.TableBody>
                              {datePicker
                                .getMonthsGrid({
                                  columns: 4,
                                  format: 'short',
                                })
                                .map((months, id) => (
                                  <DatePicker.TableRow key={id}>
                                    {months.map((month, id) => (
                                      <DatePicker.TableCell
                                        key={id}
                                        value={month.value}
                                      >
                                        <DatePicker.TableCellTrigger asChild>
                                          <Button
                                            size="2xs"
                                            variant={
                                              datePicker.value[0]?.month ===
                                              month.value
                                                ? 'solid'
                                                : 'ghost'
                                            }
                                          >
                                            {month.label}
                                          </Button>
                                        </DatePicker.TableCellTrigger>
                                      </DatePicker.TableCell>
                                    ))}
                                  </DatePicker.TableRow>
                                ))}
                            </DatePicker.TableBody>
                          </DatePicker.Table>
                        </Card.Body>
                      </Card.Root>
                    )}
                  </DatePicker.Context>
                </DatePicker.View>
                <DatePicker.View view="year">
                  <DatePicker.Context>
                    {(datePicker) => (
                      <Card.Root variant="elevated">
                        <Card.Body as={Stack} gap={4} p={3}>
                          <HStack>
                            <NativeSelectRoot size="xs" variant="plain">
                              <NativeSelectField
                                {...datePicker.getMonthSelectProps()}
                              >
                                {datePicker.getMonths().map((month, id) => (
                                  <option key={id} value={month.value}>
                                    {month.label}
                                  </option>
                                ))}
                              </NativeSelectField>
                            </NativeSelectRoot>
                            <NativeSelectRoot size="xs" variant="plain">
                              <NativeSelectField
                                {...datePicker.getYearSelectProps()}
                              >
                                {datePicker.getYears().map((month, id) => (
                                  <option key={id} value={month.value}>
                                    {month.label}
                                  </option>
                                ))}
                              </NativeSelectField>
                            </NativeSelectRoot>
                          </HStack>
                          <DatePicker.ViewControl>
                            <HStack justifyContent="space-between">
                              <DatePicker.PrevTrigger asChild>
                                <Button size="2xs" variant="ghost">
                                  <FiChevronLeft />
                                </Button>
                              </DatePicker.PrevTrigger>
                              <DatePicker.ViewTrigger>
                                <DatePicker.RangeText />
                              </DatePicker.ViewTrigger>
                              <DatePicker.NextTrigger asChild>
                                <Button size="2xs" variant="ghost">
                                  <FiChevronRight />
                                </Button>
                              </DatePicker.NextTrigger>
                            </HStack>
                          </DatePicker.ViewControl>
                          <DatePicker.Table>
                            <DatePicker.TableBody>
                              {datePicker
                                .getYearsGrid({ columns: 4 })
                                .map((years, id) => (
                                  <DatePicker.TableRow key={id}>
                                    {years.map((year, id) => (
                                      <DatePicker.TableCell
                                        key={id}
                                        value={year.value}
                                      >
                                        <DatePicker.TableCellTrigger asChild>
                                          <Button
                                            size="2xs"
                                            variant={
                                              datePicker.value[0]?.year ===
                                              year.value
                                                ? 'solid'
                                                : 'ghost'
                                            }
                                          >
                                            {year.label}
                                          </Button>
                                        </DatePicker.TableCellTrigger>
                                      </DatePicker.TableCell>
                                    ))}
                                  </DatePicker.TableRow>
                                ))}
                            </DatePicker.TableBody>
                          </DatePicker.Table>
                        </Card.Body>
                      </Card.Root>
                    )}
                  </DatePicker.Context>
                </DatePicker.View>
              </DatePicker.Content>
            </DatePicker.Positioner>
          </Portal>
        </DatePicker.Root>
      </Box>
    )
  }
)

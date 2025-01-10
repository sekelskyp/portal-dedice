import { Table } from '@chakra-ui/react'

export function DateRulesTable({
  dateRules,
}: {
  dateRules: { id: string; value: string }[]
}) {
  return (
    <Table.Root size="sm" width={{ base: '100%', md: '50%' }}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader fontWeight="bold">
            Datum narození zůstavitele (každý rok)
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {dateRules.map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.value}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

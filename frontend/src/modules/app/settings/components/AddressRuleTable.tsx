import { Table } from '@chakra-ui/react'

import { getPlaceByPostalCode } from '../../utils/addressUtils'

export function AddressRuleTable({
  postalCode,
}: {
  postalCode: string | null | undefined
}) {
  return (
    <Table.Root size="sm" width={{ base: '100%', md: '50%' }}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader fontWeight="bold">
            Trvalé bydliště zůstavitele (PSČ)
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          {postalCode ? (
            <Table.Cell>
              {getPlaceByPostalCode(postalCode)} ({postalCode})
            </Table.Cell>
          ) : (
            <Table.Cell>Nezadáno</Table.Cell>
          )}
        </Table.Row>
      </Table.Body>
    </Table.Root>
  )
}

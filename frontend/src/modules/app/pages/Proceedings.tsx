import { Heading, Stack } from '@chakra-ui/react'

import { ProceedingsTable } from '../components/ProceedingsTable'

const items = [
  { id: 8457, date: '2024-01-05', status: 'Probíhající' },
  { id: 1845, date: '2024-03-07', status: 'Uzavřené' },
  { id: 1197, date: '2024-04-08', status: 'Probíhající' },
  { id: 5874, date: '2024-05-01', status: 'Probíhající' },
  { id: 9300, date: '2024-08-03', status: 'Uzavřené' },
  { id: 8457, date: '2024-01-05', status: 'Probíhající' },
  { id: 1845, date: '2024-03-07', status: 'Uzavřené' },
  { id: 1197, date: '2024-04-08', status: 'Probíhající' },
  { id: 5874, date: '2024-05-01', status: 'Probíhající' },
  { id: 9300, date: '2024-08-03', status: 'Uzavřené' },
  { id: 8457, date: '2024-01-05', status: 'Probíhající' },
  { id: 1845, date: '2024-03-07', status: 'Uzavřené' },
  { id: 1197, date: '2024-04-08', status: 'Probíhající' },
  { id: 5874, date: '2024-05-01', status: 'Probíhající' },
  { id: 9300, date: '2024-08-03', status: 'Uzavřené' },
  { id: 8457, date: '2024-01-05', status: 'Probíhající' },
  { id: 1845, date: '2024-03-07', status: 'Uzavřené' },
  { id: 1197, date: '2024-04-08', status: 'Probíhající' },
  { id: 5874, date: '2024-05-01', status: 'Probíhající' },
  { id: 9300, date: '2024-08-03', status: 'Uzavřené' },
]

export function Proceedings() {
  return (
    <Stack>
      <Heading textAlign="center" pt={8}>
        Moje řízení
      </Heading>
      <ProceedingsTable data={items} />
    </Stack>
  )
}

import { Heading, Stack } from '@chakra-ui/react'

import { ProceedingsTable } from '../components/ProceedingsTable'

const items = [
  { id: 8457, date: '2024-01-05', status: 'Probíhající' },
  { id: 1845, date: '2021-03-07', status: 'Uzavřené' },
  { id: 1197, date: '2019-04-08', status: 'Probíhající' },
  { id: 5874, date: '2020-05-01', status: 'Probíhající' },
  { id: 9300, date: '2024-08-03', status: 'Uzavřené' },
  { id: 8457, date: '2024-01-05', status: 'Probíhající' },
  { id: 1845, date: '2024-03-07', status: 'Uzavřené' },
  { id: 1197, date: '2024-04-08', status: 'Probíhající' },
  { id: 8794, date: '2024-05-01', status: 'Probíhající' },
  { id: 5240, date: '2024-08-03', status: 'Uzavřené' },
  { id: 7717, date: '2023-01-05', status: 'Probíhající' },
  { id: 5429, date: '2010-03-07', status: 'Uzavřené' },
  { id: 4587, date: '2024-04-08', status: 'Probíhající' },
  { id: 8944, date: '2024-05-01', status: 'Probíhající' },
  { id: 5640, date: '2024-08-03', status: 'Uzavřené' },
  { id: 1237, date: '2024-01-05', status: 'Probíhající' },
  { id: 8585, date: '2015-03-07', status: 'Uzavřené' },
  { id: 1191, date: '2014-04-08', status: 'Probíhající' },
  { id: 1111, date: '2024-08-01', status: 'Probíhající' },
  { id: 9008, date: '2024-07-03', status: 'Uzavřené' },
  { id: 6784, date: '2009-05-01', status: 'Probíhající' },
  { id: 1111, date: '2024-05-05', status: 'Probíhající' },
]

export function Proceedings() {
  return (
    <Stack justifyContent="center" alignContent="center" alignItems="center">
      <Heading textAlign="center" pt={8}>
        Moje řízení
      </Heading>
      <ProceedingsTable data={items} />
    </Stack>
  )
}

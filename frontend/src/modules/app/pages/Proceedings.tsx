import { Button, Heading, Stack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { route } from '@frontend/route'

import { ProceedingsTable } from '../components/ProceedingsTable'

//TODO: replace with real data
//TODO: add routing when pages are ready
//TODO: render different content based on user role

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
      <Button as={Link} to={route.home()} m={10}>
        Vytvořit nové řízení
      </Button>
      <Heading as="h4" size="h4">
        Další možnosti
      </Heading>
      <Stack direction="row" mb={10}>
        <Button as={Link} to={route.wizard()}>
          Chci vědět jak řízení probíhá
        </Button>
        <Button as={Link} to={route.home()}>
          Chci se na schůzku připravit
        </Button>
        <Button as={Link} to={route.home()}>
          Chci si zkusit modelaci dědění
        </Button>
      </Stack>
      <Heading as="h3" size="h3">
        Seznam všech řízení
      </Heading>
      <ProceedingsTable data={items} />
    </Stack>
  )
}

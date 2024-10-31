import { Button, Heading, Stack } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import { Link } from 'react-router-dom'

import { route } from '@shared/route'

import {
  ProceedingsItem,
  ProceedingsTable,
} from '../components/proceedings-table/ProceedingsTable'
import { proceedingsNavigation } from '../utils/proceedingsNavigation'

//TODO: replace with real data
//TODO: add routing when pages are ready
//TODO: render different content based on user role

// placeholder function to generate a lot of data of type ProceedingsItem
function generateFakeData(count: number): ProceedingsItem[] {
  const items: ProceedingsItem[] = []

  for (let i = 0; i < count; i++) {
    const item: ProceedingsItem = {
      id: faker.number.int({ min: 1000, max: 9999 }),
      date: faker.date
        .between({ from: new Date('2009-01-01'), to: new Date('2024-12-31') })
        .toISOString()
        .split('T')[0],
      status: faker.helpers.arrayElement(['Probíhající', 'Uzavřené']),
    }

    items.push(item)
  }

  return items
}

export function Proceedings() {
  return (
    <Stack justifyContent="center" alignContent="center" alignItems="center">
      <Heading textAlign="center" pt={8} size="3xl">
        Mé řízení
      </Heading>
      <Link to={route.home()}>
        {' '}
        <Button>Vytvořit nové řízení</Button>
      </Link>
      <Heading size="xl">Další možnosti</Heading>
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        textAlign="center"
        mb={10}
      >
        {proceedingsNavigation.map((item, index) => (
          <Link key={index} to={item.link}>
            <Button width="100%">{item.text}</Button>
          </Link>
        ))}
      </Stack>
      <Heading size="2xl">Seznam všech řízení</Heading>
      <ProceedingsTable data={generateFakeData(749)} />
    </Stack>
  )
}

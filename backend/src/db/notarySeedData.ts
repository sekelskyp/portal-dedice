export interface ContactSeedValue {
  name: string
  surname: string
  dateOfBirth: Date
  gender: 'Male' | 'Female'
  phone: string
  email: string
  country: string
  city: string
  street: string
  postalCode: string
}

export interface NotaryDateRuleValue {
  startDay: number
  endDay: number
  startMonth: number
  endMonth: number
}

export interface NotarySeedData {
  contact: ContactSeedValue
  dateRules: NotaryDateRuleValue[]
}

export const notarySeedData: NotarySeedData[] = [
  // Praha 1
  {
    contact: {
      name: 'Petr',
      surname: 'Hochman',
      dateOfBirth: new Date('1972-04-10'),
      gender: 'Male',
      phone: '+420777111222',
      email: 'petr.hochman@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Old Town Square 1',
      postalCode: '11000',
    },
    dateRules: [
      {
        startDay: 1,
        endDay: 31,
        startMonth: 1,
        endMonth: 1,
      },
      {
        startDay: 1,
        endDay: 28,
        startMonth: 2,
        endMonth: 2,
      },
    ],
  },
  {
    contact: {
      name: 'Roman',
      surname: 'Hochman',
      dateOfBirth: new Date('1974-05-15'),
      gender: 'Male',
      phone: '+420777222333',
      email: 'roman.hochman@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Charles Bridge 15',
      postalCode: '11800',
    },
    dateRules: [
      {
        startDay: 1,
        endDay: 31,
        startMonth: 3,
        endMonth: 3,
      },
      {
        startDay: 1,
        endDay: 30,
        startMonth: 4,
        endMonth: 4,
      },
    ],
  },
  {
    contact: {
      name: 'Bohdan',
      surname: 'Hallada',
      dateOfBirth: new Date('1968-07-20'),
      gender: 'Male',
      phone: '+420777333444',
      email: 'bohdan.hallada@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Wenceslas Square 21',
      postalCode: '11000',
    },
    dateRules: [
      {
        startDay: 1,
        endDay: 31,
        startMonth: 5,
        endMonth: 5,
      },
      {
        startDay: 1,
        endDay: 30,
        startMonth: 6,
        endMonth: 6,
      },
    ],
  },
  {
    contact: {
      name: 'Jarmila',
      surname: 'Humpolcová',
      dateOfBirth: new Date('1970-02-28'),
      gender: 'Female',
      phone: '+420777444555',
      email: 'jarmila.humpolcova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Vinohrady 34',
      postalCode: '12000',
    },
    dateRules: [
      {
        startDay: 1,
        endDay: 31,
        startMonth: 7,
        endMonth: 7,
      },
      {
        startDay: 1,
        endDay: 31,
        startMonth: 8,
        endMonth: 8,
      },
    ],
  },
  {
    contact: {
      name: 'Miroslav',
      surname: 'Novák',
      dateOfBirth: new Date('1980-06-18'),
      gender: 'Male',
      phone: '+420777555666',
      email: 'miroslav.novak@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Malá Strana 17',
      postalCode: '11800',
    },
    dateRules: [
      {
        startDay: 1,
        endDay: 30,
        startMonth: 9,
        endMonth: 9,
      },
      {
        startDay: 1,
        endDay: 31,
        startMonth: 10,
        endMonth: 10,
      },
    ],
  },
  {
    contact: {
      name: 'Lucie',
      surname: 'Vaňková',
      dateOfBirth: new Date('1982-09-25'),
      gender: 'Female',
      phone: '+420777666777',
      email: 'lucie.vankova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Letná 50',
      postalCode: '17000',
    },
    dateRules: [
      {
        startDay: 1,
        endDay: 30,
        startMonth: 11,
        endMonth: 11,
      },
      {
        startDay: 1,
        endDay: 31,
        startMonth: 12,
        endMonth: 12,
      },
    ],
  },
  // Praha 2
  {
    contact: {
      name: 'Zuzana',
      surname: 'Holá Procházková',
      dateOfBirth: new Date('1978-05-12'),
      gender: 'Female',
      phone: '+420777333444',
      email: 'zuzana.prochazkova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Wenceslas Square 1',
      postalCode: '12000',
    },
    dateRules: [
      {
        startDay: 1,
        endDay: 31,
        startMonth: 1,
        endMonth: 3, // 1st quarter: January to March
      },
    ],
  },
  {
    contact: {
      name: 'Nikola',
      surname: 'Slavík',
      dateOfBirth: new Date('1980-07-23'),
      gender: 'Male',
      phone: '+420777444555',
      email: 'nikola.slavik@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Charles Square 10',
      postalCode: '12000',
    },
    dateRules: [
      {
        startDay: 1,
        endDay: 30,
        startMonth: 4,
        endMonth: 6, // 2nd quarter: April to June
      },
    ],
  },
  {
    contact: {
      name: 'Lukáš',
      surname: 'Valigura',
      dateOfBirth: new Date('1985-09-18'),
      gender: 'Male',
      phone: '+420777555666',
      email: 'lukas.valigura@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Karlovo Náměstí 5',
      postalCode: '12000',
    },
    dateRules: [
      {
        startDay: 1,
        endDay: 30,
        startMonth: 7,
        endMonth: 9, // 3rd quarter: July to September
      },
    ],
  },
  {
    contact: {
      name: 'František',
      surname: 'Bouček',
      dateOfBirth: new Date('1973-03-22'),
      gender: 'Male',
      phone: '+420777666777',
      email: 'frantisek.boucek@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Na Příkopě 15',
      postalCode: '12000',
    },
    dateRules: [
      {
        startDay: 1,
        endDay: 31,
        startMonth: 10,
        endMonth: 12, // 4th quarter: October to December
      },
    ],
  },

  // Praha 3
  {
    contact: {
      name: 'Iva',
      surname: 'Šídová',
      dateOfBirth: new Date('1965-01-15'),
      gender: 'Female',
      phone: '+420777888999',
      email: 'iva.sidova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Vinohradská 30',
      postalCode: '13000',
    },
    dateRules: [
      {
        startDay: 1,
        endDay: 6,
        startMonth: 1,
        endMonth: 12, // 1st to 6th every month
      },
      {
        startDay: 31,
        endDay: 31,
        startMonth: 1,
        endMonth: 1, // Special rule: 31st of January
      },
    ],
  },
  {
    contact: {
      name: 'Erik',
      surname: 'Mrzena',
      dateOfBirth: new Date('1975-04-18'),
      gender: 'Male',
      phone: '+420777999000',
      email: 'erik.mrzena@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Žižkova 50',
      postalCode: '13000',
    },
    dateRules: [
      {
        startDay: 7,
        endDay: 12,
        startMonth: 1,
        endMonth: 12, // 7th to 12th every month
      },
      {
        startDay: 31,
        endDay: 31,
        startMonth: 3,
        endMonth: 3, // Special rule: 31st of March
      },
    ],
  },
  {
    contact: {
      name: 'Radim',
      surname: 'Neubauer',
      dateOfBirth: new Date('1982-07-21'),
      gender: 'Male',
      phone: '+420777000111',
      email: 'radim.neubauer@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Olšanská 12',
      postalCode: '13000',
    },
    dateRules: [
      {
        startDay: 13,
        endDay: 18,
        startMonth: 1,
        endMonth: 12, // 13th to 18th every month
      },
      {
        startDay: 31,
        endDay: 31,
        startMonth: 5,
        endMonth: 5, // Special rule: 31st of May
      },
    ],
  },
  {
    contact: {
      name: 'Markéta',
      surname: 'Menclerová',
      dateOfBirth: new Date('1970-02-28'),
      gender: 'Female',
      phone: '+420777111222',
      email: 'marketa.menclerova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Jičínská 8',
      postalCode: '13000',
    },
    dateRules: [
      {
        startDay: 19,
        endDay: 24,
        startMonth: 1,
        endMonth: 12, // 19th to 24th every month
      },
      {
        startDay: 31,
        endDay: 31,
        startMonth: 7,
        endMonth: 7, // Special rule: 31st of July
      },
    ],
  },
  {
    contact: {
      name: 'Štěpán',
      surname: 'Stancl',
      dateOfBirth: new Date('1988-11-09'),
      gender: 'Male',
      phone: '+420777222333',
      email: 'stepan.stancl@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Husitská 15',
      postalCode: '13000',
    },
    dateRules: [
      { startDay: 25, endDay: 30, startMonth: 1, endMonth: 12 },
      { startDay: 31, endDay: 31, startMonth: 8, endMonth: 8 },
      { startDay: 31, endDay: 31, startMonth: 10, endMonth: 10 },
      { startDay: 31, endDay: 31, startMonth: 12, endMonth: 12 },
    ],
  },
  // Praha 4
  {
    contact: {
      name: 'Markéta',
      surname: 'Nývltová',
      dateOfBirth: new Date('1978-03-14'),
      gender: 'Female',
      phone: '+420777444555',
      email: 'marketa.nyvltova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Modřanská 72',
      postalCode: '14000',
    },
    dateRules: [{ startDay: 1, endDay: 31, startMonth: 1, endMonth: 1 }],
  },
  {
    contact: {
      name: 'Ondřej',
      surname: 'Klička',
      dateOfBirth: new Date('1975-11-23'),
      gender: 'Male',
      phone: '+420777555666',
      email: 'ondrej.klicka@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Branická 23',
      postalCode: '14000',
    },
    dateRules: [{ startDay: 1, endDay: 31, startMonth: 2, endMonth: 2 }],
  },
  {
    contact: {
      name: 'Markéta',
      surname: 'Káninská',
      dateOfBirth: new Date('1980-07-19'),
      gender: 'Female',
      phone: '+420777666777',
      email: 'marketa.kaninska@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Podolská 34',
      postalCode: '14000',
    },
    dateRules: [{ startDay: 1, endDay: 31, startMonth: 3, endMonth: 3 }],
  },
  {
    contact: {
      name: 'František',
      surname: 'Novotný',
      dateOfBirth: new Date('1972-09-06'),
      gender: 'Male',
      phone: '+420777777888',
      email: 'frantisek.novotny@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Nad Malým Mýtem 11',
      postalCode: '14000',
    },
    dateRules: [{ startDay: 1, endDay: 30, startMonth: 4, endMonth: 4 }],
  },
  {
    contact: {
      name: 'Šárka',
      surname: 'Tlašková',
      dateOfBirth: new Date('1982-05-12'),
      gender: 'Female',
      phone: '+420777888999',
      email: 'sarka.tlaskova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Lhotka 7',
      postalCode: '14000',
    },
    dateRules: [{ startDay: 1, endDay: 31, startMonth: 5, endMonth: 5 }],
  },
  {
    contact: {
      name: 'Petr',
      surname: 'Duda',
      dateOfBirth: new Date('1982-05-12'),
      gender: 'Male',
      phone: '+420777888999',
      email: 'petr.duda@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Lhotka 7',
      postalCode: '14000',
    },
    dateRules: [{ startDay: 1, endDay: 31, startMonth: 6, endMonth: 6 }],
  },
  {
    contact: {
      name: 'Šárka',
      surname: 'Matějčková',
      dateOfBirth: new Date('1982-05-12'),
      gender: 'Female',
      phone: '+420777888999',
      email: 'sarka.matejickova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Lhotka 7',
      postalCode: '14000',
    },
    dateRules: [{ startDay: 1, endDay: 31, startMonth: 7, endMonth: 7 }],
  },
  {
    contact: {
      name: 'Šárka',
      surname: 'Sýkorová',
      dateOfBirth: new Date('1982-05-12'),
      gender: 'Female',
      phone: '+420777888999',
      email: 'sarka.sykorova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Lhotka 7',
      postalCode: '14000',
    },
    dateRules: [{ startDay: 1, endDay: 31, startMonth: 8, endMonth: 8 }],
  },
  {
    contact: {
      name: 'Jana',
      surname: 'Rybářová',
      dateOfBirth: new Date('1982-05-12'),
      gender: 'Female',
      phone: '+420777888999',
      email: 'jana.rybarova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Lhotka 7',
      postalCode: '14000',
    },
    dateRules: [{ startDay: 1, endDay: 31, startMonth: 9, endMonth: 9 }],
  },
  {
    contact: {
      name: 'Petr',
      surname: 'Oulík',
      dateOfBirth: new Date('1982-05-12'),
      gender: 'Male',
      phone: '+420777888999',
      email: 'petr.oulik@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Lhotka 7',
      postalCode: '14000',
    },
    dateRules: [{ startDay: 1, endDay: 31, startMonth: 10, endMonth: 10 }],
  },
  {
    contact: {
      name: 'Petra',
      surname: 'Habartová',
      dateOfBirth: new Date('1982-05-12'),
      gender: 'Male',
      phone: '+420777888999',
      email: 'petra.habartova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Lhotka 7',
      postalCode: '14000',
    },
    dateRules: [{ startDay: 1, endDay: 31, startMonth: 11, endMonth: 11 }],
  },
  {
    contact: {
      name: 'Miloslav',
      surname: 'Peterka',
      dateOfBirth: new Date('1982-05-12'),
      gender: 'Male',
      phone: '+420777888999',
      email: 'miloslav.peterka@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Lhotka 7',
      postalCode: '14000',
    },
    dateRules: [{ startDay: 1, endDay: 31, startMonth: 12, endMonth: 12 }],
  },

  // Praha 5
  {
    contact: {
      name: 'Aleš',
      surname: 'Březina',
      dateOfBirth: new Date('1971-02-19'),
      gender: 'Male',
      phone: '+420777123456',
      email: 'ales.brezina@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Radlická 67',
      postalCode: '15000',
    },
    dateRules: [
      { startDay: 1, endDay: 3, startMonth: 1, endMonth: 12 }, // 1st - 3rd, Jan to May
      { startDay: 28, endDay: 28, startMonth: 1, endMonth: 5 }, // 28th, Jan to May
    ],
  },
  {
    contact: {
      name: 'Jakub',
      surname: 'Straděj',
      dateOfBirth: new Date('1973-04-22'),
      gender: 'Male',
      phone: '+420777234567',
      email: 'jakub.stradej@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Nádražní 89',
      postalCode: '15000',
    },
    dateRules: [
      { startDay: 4, endDay: 6, startMonth: 1, endMonth: 12 }, // 4th - 6th, Jun to Oct
      { startDay: 28, endDay: 28, startMonth: 6, endMonth: 10 }, // 28th, Jun to Oct
    ],
  },
  {
    contact: {
      name: 'Michaela',
      surname: 'Havlová',
      dateOfBirth: new Date('1981-08-03'),
      gender: 'Female',
      phone: '+420777345678',
      email: 'michaela.havlova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Štefánikova 12',
      postalCode: '15000',
    },
    dateRules: [
      { startDay: 8, endDay: 10, startMonth: 1, endMonth: 12 }, // 8th - 10th of every month, November to December
      { startDay: 28, endDay: 28, startMonth: 11, endMonth: 12 }, // 28th of every month, November to December
      { startDay: 29, endDay: 29, startMonth: 1, endMonth: 1 }, // 29th of every month, every year
      { startDay: 29, endDay: 29, startMonth: 3, endMonth: 4 },
    ],
  },
  {
    contact: {
      name: 'Alena',
      surname: 'Procházková',
      dateOfBirth: new Date('1980-11-17'),
      gender: 'Female',
      phone: '+420777456789',
      email: 'alena.prochazkova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Strakonická 45',
      postalCode: '15000',
    },
    dateRules: [
      { startDay: 13, endDay: 15, startMonth: 1, endMonth: 12 }, // 13th - 15th, May to Sep
      { startDay: 29, endDay: 29, startMonth: 5, endMonth: 9 }, // 29th, May to Sep
    ],
  },
  {
    contact: {
      name: 'Tereza',
      surname: 'Kubišová',
      dateOfBirth: new Date('1979-05-27'),
      gender: 'Female',
      phone: '+420777567890',
      email: 'tereza.kubisova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Vítězná 9',
      postalCode: '15000',
    },
    dateRules: [
      { startDay: 16, endDay: 18, startMonth: 1, endMonth: 12 },
      { startDay: 29, endDay: 29, startMonth: 10, endMonth: 12 },
      { startDay: 30, endDay: 30, startMonth: 1, endMonth: 1 },
      { startDay: 30, endDay: 30, startMonth: 3, endMonth: 3 },
    ],
  },
  {
    contact: {
      name: 'Lenka',
      surname: 'Leszay',
      dateOfBirth: new Date('1982-06-01'),
      gender: 'Female',
      phone: '+420777678901',
      email: 'lenka.leszay@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Šaldova 10',
      postalCode: '18600',
    },
    dateRules: [
      { startDay: 19, endDay: 21, startMonth: 1, endMonth: 12 },
      { startDay: 30, endDay: 30, startMonth: 4, endMonth: 7 }, // 30th, Apr to Jul
      { startDay: 29, endDay: 29, startMonth: 2, endMonth: 2 }, // 29th of February every leap year
    ],
  },
  {
    contact: {
      name: 'Martin',
      surname: 'Diviš',
      dateOfBirth: new Date('1982-07-03'),
      gender: 'Male',
      phone: '+420777567890',
      email: 'martin.divis@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Ocelářská 12',
      postalCode: '19000',
    },
    dateRules: [
      { startDay: 25, endDay: 27, startMonth: 1, endMonth: 12 },
      { startDay: 30, endDay: 30, startMonth: 8, endMonth: 11 }, // 30th, Aug to Nov
    ],
  },
  {
    contact: {
      name: 'Jiří',
      surname: 'Svoboda',
      dateOfBirth: new Date('1984-02-11'),
      gender: 'Male',
      phone: '+420777234567',
      email: 'jiri.svoboda@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Vysočanská 21',
      postalCode: '19000',
    },
    dateRules: [
      { startDay: 22, endDay: 24, startMonth: 1, endMonth: 12 }, // 22nd - 24th, Dec
      { startDay: 30, endDay: 30, startMonth: 12, endMonth: 12 }, // 30th, Dec
      { startDay: 31, endDay: 31, startMonth: 1, endMonth: 1 },
      { startDay: 31, endDay: 31, startMonth: 3, endMonth: 3 },
      { startDay: 31, endDay: 31, startMonth: 5, endMonth: 5 }, // 31st, May
    ],
  },
  {
    contact: {
      name: 'Václav',
      surname: 'Voda',
      dateOfBirth: new Date('1977-12-03'),
      gender: 'Male',
      phone: '+420777956789',
      email: 'vaclav.voda@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Horní Měcholupy 34',
      postalCode: '10900',
    },
    dateRules: [
      { startDay: 7, endDay: 12, startMonth: 1, endMonth: 12 }, // 7th - 12th, Jul to Dec
      { startDay: 31, endDay: 31, startMonth: 7, endMonth: 12 }, // 31st, Jul to Dec
    ],
  },
  // Praha 6
  {
    contact: {
      name: 'Naděžda',
      surname: 'Alšová',
      dateOfBirth: new Date('1976-03-15'),
      gender: 'Female',
      phone: '+420777123456',
      email: 'nadezda.alsova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Na Petynce 20',
      postalCode: '16000',
    },
    dateRules: [
      { startDay: 1, endDay: 3, startMonth: 1, endMonth: 12 }, // 1st - 3rd, every month
      { startDay: 27, endDay: 27, startMonth: 6, endMonth: 10 }, // 27th
    ],
  },
  {
    contact: {
      name: 'Ivana',
      surname: 'Krušková',
      dateOfBirth: new Date('1972-09-25'),
      gender: 'Female',
      phone: '+420777234567',
      email: 'ivana.kruskova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Pod Kaštany 8',
      postalCode: '16000',
    },
    dateRules: [
      { startDay: 4, endDay: 6, startMonth: 1, endMonth: 12 }, // 4th - 6th, every month
      { startDay: 7, endDay: 7, startMonth: 1, endMonth: 5 }, // 7th
    ],
  },
  {
    contact: {
      name: 'Jana',
      surname: 'Večerníková',
      dateOfBirth: new Date('1980-07-12'),
      gender: 'Female',
      phone: '+420777345678',
      email: 'jana.vecernikova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'V Šáreckém údolí 15',
      postalCode: '16000',
    },
    dateRules: [
      { startDay: 9, endDay: 11, startMonth: 1, endMonth: 12 }, // 9th - 11th, every month
      { startDay: 8, endDay: 8, startMonth: 7, endMonth: 11 }, // 8th
    ],
  },
  {
    contact: {
      name: 'Martin',
      surname: 'Krčma',
      dateOfBirth: new Date('1985-02-14'),
      gender: 'Male',
      phone: '+420777456789',
      email: 'martin.krcma@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Na Ořechovce 33',
      postalCode: '16000',
    },
    dateRules: [
      { startDay: 12, endDay: 14, startMonth: 1, endMonth: 12 }, // 12th - 14th, every month
      { startDay: 8, endDay: 8, startMonth: 2, endMonth: 6 }, // 8th
    ],
  },
  {
    contact: {
      name: 'Olga',
      surname: 'Spoustová',
      dateOfBirth: new Date('1977-10-01'),
      gender: 'Female',
      phone: '+420777567890',
      email: 'olga.spoustova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Zelená 45',
      postalCode: '16000',
    },
    dateRules: [
      { startDay: 15, endDay: 17, startMonth: 1, endMonth: 12 }, // 15th - 17th, every month
      { startDay: 8, endDay: 8, startMonth: 12, endMonth: 12 }, // 8th December
    ],
  },
  {
    contact: {
      name: 'Alexandra',
      surname: 'Červová',
      dateOfBirth: new Date('1982-06-21'),
      gender: 'Female',
      phone: '+420777678901',
      email: 'alexandra.cervova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Evropská 12',
      postalCode: '16000',
    },
    dateRules: [
      { startDay: 18, endDay: 20, startMonth: 1, endMonth: 12 }, // 18th - 20th, every month
      { startDay: 7, endDay: 7, startMonth: 9, endMonth: 12 },
      { startDay: 8, endDay: 8, startMonth: 1, endMonth: 1 },
    ],
  },
  {
    contact: {
      name: 'Jan',
      surname: 'Hejtmánek',
      dateOfBirth: new Date('1979-04-05'),
      gender: 'Male',
      phone: '+420777789012',
      email: 'jan.hejtmanek@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Na Špitálce 9',
      postalCode: '16000',
    },
    dateRules: [
      { startDay: 21, endDay: 23, startMonth: 1, endMonth: 12 }, // 21st - 23rd, every month
      { startDay: 27, endDay: 27, startMonth: 11, endMonth: 12 },
      { startDay: 7, endDay: 7, startMonth: 6, endMonth: 8 },
    ],
  },
  {
    contact: {
      name: 'Jan',
      surname: 'Krůta',
      dateOfBirth: new Date('1976-12-09'),
      gender: 'Male',
      phone: '+420777890123',
      email: 'jan.kruta@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Střešovická 14',
      postalCode: '16000',
    },
    dateRules: [
      { startDay: 24, endDay: 26, startMonth: 1, endMonth: 12 }, // 24th - 26th, every month
      { startDay: 27, endDay: 27, startMonth: 1, endMonth: 5 },
    ],
  },
  {
    contact: {
      name: 'Blanka',
      surname: 'Čechová',
      dateOfBirth: new Date('1983-09-17'),
      gender: 'Female',
      phone: '+420777901234',
      email: 'blanka.cechova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Na Bateriích 17',
      postalCode: '16000',
    },
    dateRules: [
      { startDay: 28, endDay: 31, startMonth: 1, endMonth: 12 }, // 28th - 31st, every month
    ],
  },

  // Praha 7
  {
    contact: {
      name: 'Eva',
      surname: 'Králová',
      dateOfBirth: new Date('1978-11-22'),
      gender: 'Female',
      phone: '+420777345123',
      email: 'eva.kralova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Letenská 25',
      postalCode: '17000',
    },
    dateRules: [
      { startDay: 1, endDay: 31, startMonth: 1, endMonth: 3 }, // 1st quarter (January to March)
    ],
  },
  {
    contact: {
      name: 'Vanda',
      surname: 'Pirková',
      dateOfBirth: new Date('1981-04-15'),
      gender: 'Female',
      phone: '+420777456234',
      email: 'vanda.pirkova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Milady Horákové 10',
      postalCode: '17000',
    },
    dateRules: [
      { startDay: 1, endDay: 31, startMonth: 4, endMonth: 6 }, // 2nd quarter (April to June)
    ],
  },
  {
    contact: {
      name: 'Gajané',
      surname: 'Rejzková',
      dateOfBirth: new Date('1979-07-30'),
      gender: 'Female',
      phone: '+420777567345',
      email: 'gajane.rejzkova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'U Sparty 5',
      postalCode: '17000',
    },
    dateRules: [
      { startDay: 1, endDay: 31, startMonth: 7, endMonth: 9 }, // 3rd quarter (July to September)
    ],
  },
  {
    contact: {
      name: 'Karel',
      surname: 'Uhlíř',
      dateOfBirth: new Date('1975-03-18'),
      gender: 'Male',
      phone: '+420777678456',
      email: 'karel.uhlir@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'U Výstaviště 17',
      postalCode: '17000',
    },
    dateRules: [
      { startDay: 1, endDay: 31, startMonth: 10, endMonth: 12 }, // 4th quarter (October to December)
    ],
  },
  // Praha 8
  {
    contact: {
      name: 'Michael',
      surname: 'Sáblík',
      dateOfBirth: new Date('1980-09-12'),
      gender: 'Male',
      phone: '+420777789012',
      email: 'michael.sablik@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Křižíkova 48',
      postalCode: '18600',
    },
    dateRules: [
      { startDay: 1, endDay: 6, startMonth: 1, endMonth: 12 }, // 1st - 6th of each month
      { startDay: 31, endDay: 31, startMonth: 1, endMonth: 1 }, // 31st January
      { startDay: 31, endDay: 31, startMonth: 7, endMonth: 7 }, // 31st July
      { startDay: 31, endDay: 31, startMonth: 12, endMonth: 12 }, // 31st December
    ],
  },
  {
    contact: {
      name: 'Michaela',
      surname: 'Oswaldová',
      dateOfBirth: new Date('1983-03-22'),
      gender: 'Female',
      phone: '+420777890123',
      email: 'michaela.oswaldova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Karlínské náměstí 12',
      postalCode: '18600',
    },
    dateRules: [
      { startDay: 7, endDay: 12, startMonth: 1, endMonth: 12 }, // 7th - 12th of each month
    ],
  },
  {
    contact: {
      name: 'Hana',
      surname: 'Remešová',
      dateOfBirth: new Date('1982-08-15'),
      gender: 'Female',
      phone: '+420777901234',
      email: 'hana.remesova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Pernerova 7',
      postalCode: '18600',
    },
    dateRules: [
      { startDay: 13, endDay: 18, startMonth: 1, endMonth: 12 }, // 13th - 18th of each month
      { startDay: 31, endDay: 31, startMonth: 3, endMonth: 3 }, // 31st March
      { startDay: 31, endDay: 31, startMonth: 8, endMonth: 8 }, // 31st August
    ],
  },
  {
    contact: {
      name: 'Šárka',
      surname: 'Zwierzynová',
      dateOfBirth: new Date('1985-06-30'),
      gender: 'Female',
      phone: '+420777012345',
      email: 'sarka.zwierzynova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Thámova 20',
      postalCode: '18600',
    },
    dateRules: [
      { startDay: 19, endDay: 24, startMonth: 1, endMonth: 12 }, // 19th - 24th of each month
    ],
  },
  {
    contact: {
      name: 'Eva',
      surname: 'Krejcarová',
      dateOfBirth: new Date('1979-12-25'),
      gender: 'Female',
      phone: '+420777123456',
      email: 'eva.krejcarova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Šaldova 16',
      postalCode: '18600',
    },
    dateRules: [
      { startDay: 25, endDay: 30, startMonth: 1, endMonth: 12 }, // 25th - 30th of each month
      { startDay: 31, endDay: 31, startMonth: 5, endMonth: 5 }, // 31st May
      { startDay: 31, endDay: 31, startMonth: 10, endMonth: 10 }, // 31st October
    ],
  },

  // Praha 9
  {
    contact: {
      name: 'Šimon',
      surname: 'Březina',
      dateOfBirth: new Date('1981-11-08'),
      gender: 'Male',
      phone: '+420777234567',
      email: 'simon.brezina@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Prosecká 10',
      postalCode: '19000',
    },
    dateRules: [
      { startDay: 1, endDay: 6, startMonth: 1, endMonth: 12 }, // 1st - 6th of each month
      { startDay: 31, endDay: 31, startMonth: 1, endMonth: 1 }, // 31st January
    ],
  },
  {
    contact: {
      name: 'Soňa',
      surname: 'Glazarová',
      dateOfBirth: new Date('1984-02-11'),
      gender: 'Female',
      phone: '+420777345678',
      email: 'sona.glazarova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Vysočanská 21',
      postalCode: '19000',
    },
    dateRules: [
      { startDay: 7, endDay: 12, startMonth: 1, endMonth: 12 }, // 7th - 12th of each month
      { startDay: 31, endDay: 31, startMonth: 3, endMonth: 3 }, // 31st March
    ],
  },
  {
    contact: {
      name: 'Věra',
      surname: 'Sáblíková',
      dateOfBirth: new Date('1980-04-19'),
      gender: 'Female',
      phone: '+420777456789',
      email: 'vera.sablikova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Kolbenova 50',
      postalCode: '19000',
    },
    dateRules: [
      { startDay: 13, endDay: 18, startMonth: 1, endMonth: 12 }, // 13th - 18th of each month
      { startDay: 31, endDay: 31, startMonth: 5, endMonth: 5 }, // 31st May
    ],
  },
  {
    contact: {
      name: 'Petr',
      surname: 'Diviš',
      dateOfBirth: new Date('1982-07-03'),
      gender: 'Male',
      phone: '+420777567890',
      email: 'petr.divis@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Ocelářská 12',
      postalCode: '19000',
    },
    dateRules: [
      { startDay: 19, endDay: 24, startMonth: 1, endMonth: 12 }, // 19th - 24th of each month
      { startDay: 31, endDay: 31, startMonth: 7, endMonth: 7 }, // 31st July
    ],
  },
  {
    contact: {
      name: 'Sylva',
      surname: 'Kotrbová',
      dateOfBirth: new Date('1985-11-25'),
      gender: 'Female',
      phone: '+420777678901',
      email: 'sylva.kotrbova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Letňanská 14',
      postalCode: '19000',
    },
    dateRules: [
      { startDay: 25, endDay: 30, startMonth: 1, endMonth: 12 }, // 25th - 30th of each month
      { startDay: 31, endDay: 31, startMonth: 8, endMonth: 8 }, // 31st August
      { startDay: 31, endDay: 31, startMonth: 10, endMonth: 10 }, // 31st October
      { startDay: 31, endDay: 31, startMonth: 12, endMonth: 12 }, // 31st December
    ],
  },
  // Praha 10
  {
    contact: {
      name: 'Šimon',
      surname: 'Klein',
      dateOfBirth: new Date('1979-03-14'),
      gender: 'Male',
      phone: '+420777789012',
      email: 'simon.klein@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Vršovická 25',
      postalCode: '10100',
    },
    dateRules: [
      { startDay: 1, endDay: 3, startMonth: 1, endMonth: 12 }, // 1st - 3rd of each month
      { startDay: 16, endDay: 16, startMonth: 1, endMonth: 4 },
      { startDay: 31, endDay: 31, startMonth: 12, endMonth: 12 }, // 31st December
    ],
  },
  {
    contact: {
      name: 'Jaroslava',
      surname: 'Voclová',
      dateOfBirth: new Date('1983-06-09'),
      gender: 'Female',
      phone: '+420777890123',
      email: 'jaroslava.voclova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Eden Street 45',
      postalCode: '10100',
    },
    dateRules: [
      { startDay: 5, endDay: 7, startMonth: 1, endMonth: 12 }, // 5th - 7th of each month
      { startDay: 16, endDay: 16, startMonth: 5, endMonth: 8 },
      { startDay: 31, endDay: 31, startMonth: 3, endMonth: 3 }, // 31st March
    ],
  },
  {
    contact: {
      name: 'Martin',
      surname: 'Říha',
      dateOfBirth: new Date('1981-05-22'),
      gender: 'Male',
      phone: '+420777901234',
      email: 'martin.riha@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Záběhlická 66',
      postalCode: '10200',
    },
    dateRules: [
      { startDay: 9, endDay: 11, startMonth: 1, endMonth: 12 }, // 9th - 11th of each month
      { startDay: 16, endDay: 16, startMonth: 9, endMonth: 12 },
      { startDay: 31, endDay: 31, startMonth: 5, endMonth: 5 }, // 31st May
    ],
  },
  {
    contact: {
      name: 'Štěpán',
      surname: 'Nývlt',
      dateOfBirth: new Date('1985-02-07'),
      gender: 'Male',
      phone: '+420777912345',
      email: 'stepan.nyvlt@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Michle 72',
      postalCode: '10100',
    },
    dateRules: [
      { startDay: 13, endDay: 15, startMonth: 1, endMonth: 12 }, // 13th - 15th of each month
      { startDay: 20, endDay: 20, startMonth: 1, endMonth: 4 },
      { startDay: 31, endDay: 31, startMonth: 7, endMonth: 7 }, // 31st July
    ],
  },
  {
    contact: {
      name: 'Daniela',
      surname: 'Anderson',
      dateOfBirth: new Date('1984-08-30'),
      gender: 'Female',
      phone: '+420777923456',
      email: 'daniela.anderson@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Vinohrady 88',
      postalCode: '10100',
    },
    dateRules: [
      { startDay: 17, endDay: 19, startMonth: 1, endMonth: 12 }, // 17th - 19th of each month
      { startDay: 20, endDay: 20, startMonth: 5, endMonth: 8 },
      { startDay: 31, endDay: 31, startMonth: 8, endMonth: 8 }, // 31st August
    ],
  },
  {
    contact: {
      name: 'Věra',
      surname: 'Dundová',
      dateOfBirth: new Date('1978-09-11'),
      gender: 'Female',
      phone: '+420777934567',
      email: 'vera.dundova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Zahradní Město 93',
      postalCode: '10200',
    },
    dateRules: [
      { startDay: 21, endDay: 23, startMonth: 1, endMonth: 12 }, // 21st - 23rd of each month
      { startDay: 20, endDay: 20, startMonth: 9, endMonth: 12 },
    ],
  },
  {
    contact: {
      name: 'Jana',
      surname: 'Zangiová',
      dateOfBirth: new Date('1986-10-18'),
      gender: 'Female',
      phone: '+420777945678',
      email: 'jana.zangiova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Strašnice 12',
      postalCode: '10000',
    },
    dateRules: [
      { startDay: 24, endDay: 26, startMonth: 1, endMonth: 12 }, // 24th - 26th of each month
      { startDay: 27, endDay: 27, startMonth: 1, endMonth: 6 },
      { startDay: 31, endDay: 31, startMonth: 10, endMonth: 10 }, // 31st October
    ],
  },
  {
    contact: {
      name: 'Martin',
      surname: 'Muzikář',
      dateOfBirth: new Date('1977-12-03'),
      gender: 'Male',
      phone: '+420777956789',
      email: 'martin.muzikar@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Horní Měcholupy 34',
      postalCode: '10900',
    },
    dateRules: [
      { startDay: 28, endDay: 30, startMonth: 1, endMonth: 12 }, // 28th - 30th of each month
      { startDay: 27, endDay: 27, startMonth: 5, endMonth: 8 },
      { startDay: 31, endDay: 31, startMonth: 12, endMonth: 12 }, // 31st December
    ],
  },
  {
    contact: {
      name: 'Lucie',
      surname: 'Foukalová',
      dateOfBirth: new Date('1982-04-27'),
      gender: 'Female',
      phone: '+420777967890',
      email: 'lucie.foukalova@notary.com',
      country: 'Czech Republic',
      city: 'Prague',
      street: 'Hostivařská 17',
      postalCode: '10200',
    },
    dateRules: [
      { startDay: 4, endDay: 4, startMonth: 1, endMonth: 12 },
      { startDay: 8, endDay: 8, startMonth: 1, endMonth: 12 },
      { startDay: 12, endDay: 12, startMonth: 1, endMonth: 12 },
      { startDay: 27, endDay: 27, startMonth: 9, endMonth: 12 },
    ],
  },
]

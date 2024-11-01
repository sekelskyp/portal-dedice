import { ContactData } from '../graphql/modules/contact/contactRepository'

export interface NotaryDateRuleValue {
  startDay: number
  endDay: number
  startMonth: number
  endMonth: number
}

export interface NotarySeedData {
  contact: ContactData
  dateRules: NotaryDateRuleValue[]
}

export const notarySeedDataValues: NotarySeedData[] = [
  // Praha 1
  {
    contact: {
      displayName: 'JUDr. Petr Hochman',
      name: 'Petr',
      surname: 'Hochman',
      gender: 'Male',
      phone: '+420777111222',
      email: 'petr.hochman@notary.com',
      completeAddress: 'Old Town Square 1 11000, Prague, Czech Republic',
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
      displayName: 'JUDr. Roman Hochman',
      name: 'Roman',
      surname: 'Hochman',
      gender: 'Male',
      phone: '+420777222333',
      email: 'roman.hochman@notary.com',
      completeAddress: 'Charles Bridge 15 11800, Prague, Czech Republic',
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
      displayName: 'JUDr. Bohdan Hallada',
      name: 'Bohdan',
      surname: 'Hallada',
      gender: 'Male',
      phone: '+420777333444',
      email: 'bohdan.hallada@notary.com',
      completeAddress: 'Wenceslas Square 21 11000, Prague, Czech Republic',
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
      displayName: 'JUDr. Jarmila Humpolcová',
      name: 'Jarmila',
      surname: 'Humpolcová',
      gender: 'Female',
      phone: '+420777444555',
      email: 'jarmila.humpolcova@notary.com',
      completeAddress: 'Vinohrady 34 11000, Prague, Czech Republic',
      postalCode: '11000',
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
      displayName: 'JUDr. Miroslav Novák',
      name: 'Miroslav',
      surname: 'Novák',
      gender: 'Male',
      phone: '+420777555666',
      email: 'miroslav.novak@notary.com',
      completeAddress: 'Malá Strana 17 11000, Prague, Czech Republic',
      postalCode: '11000',
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
      displayName: 'JUDr. Lucie Vaňková',
      name: 'Lucie',
      surname: 'Vaňková',
      gender: 'Female',
      phone: '+420777666777',
      email: 'lucie.vankova@notary.com',
      completeAddress: 'Letná 50 11000, Prague, Czech Republic',
      postalCode: '11000',
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
      displayName: 'JUDr. Zuzana Holá Procházková',
      name: 'Zuzana',
      surname: 'Holá Procházková',
      gender: 'Female',
      phone: '+420777333444',
      email: 'zuzana.prochazkova@notary.com',
      completeAddress: 'Wenceslas Square 1 12000, Prague, Czech Republic',
      postalCode: '12000',
    },
    dateRules: [
      {
        startDay: 1,
        endDay: 31,
        startMonth: 1,
        endMonth: 3,
      },
    ],
  },
  {
    contact: {
      displayName: 'Mgr. Nikola Slavík',
      name: 'Nikola',
      surname: 'Slavík',
      gender: 'Male',
      phone: '+420777444555',
      email: 'nikola.slavik@notary.com',
      completeAddress: 'Charles Square 10 12000, Prague, Czech Republic',
      postalCode: '12000',
    },
    dateRules: [
      {
        startDay: 1,
        endDay: 30,
        startMonth: 4,
        endMonth: 6,
      },
    ],
  },
  {
    contact: {
      displayName: 'Mgr. Lukáš Valigura',
      name: 'Lukáš',
      surname: 'Valigura',
      gender: 'Male',
      phone: '+420777555666',
      email: 'lukas.valigura@notary.com',
      completeAddress: 'Karlovo Náměstí 5 12000, Prague, Czech Republic',
      postalCode: '12000',
    },
    dateRules: [
      {
        startDay: 1,
        endDay: 30,
        startMonth: 7,
        endMonth: 9,
      },
    ],
  },
  {
    contact: {
      displayName: 'JUDr. František Bouček, Ph.D.',
      name: 'František',
      surname: 'Bouček',
      gender: 'Male',
      phone: '+420777666777',
      email: 'frantisek.boucek@notary.com',
      completeAddress: 'Na Příkopě 15 12000, Prague, Czech Republic',
      postalCode: '12000',
    },
    dateRules: [
      {
        startDay: 1,
        endDay: 31,
        startMonth: 10,
        endMonth: 12,
      },
    ],
  },

  // Praha 3
  {
    contact: {
      displayName: 'JUDr. Iva Šídová',
      name: 'Iva',
      surname: 'Šídová',
      gender: 'Female',
      phone: '+420777888999',
      email: 'iva.sidova@notary.com',
      completeAddress: 'Vinohradská 30 13000, Prague, Czech Republic',
      postalCode: '13000',
    },
    dateRules: [
      {
        startDay: 1,
        endDay: 6,
        startMonth: 1,
        endMonth: 12,
      },
      {
        startDay: 31,
        endDay: 31,
        startMonth: 1,
        endMonth: 1,
      },
    ],
  },
  {
    contact: {
      displayName: 'Mgr. Erik Mrzena',
      name: 'Erik',
      surname: 'Mrzena',
      gender: 'Male',
      phone: '+420777999000',
      email: 'erik.mrzena@notary.com',
      completeAddress: 'Žižkova 50 13000, Prague, Czech Republic',
      postalCode: '13000',
    },
    dateRules: [
      {
        startDay: 7,
        endDay: 12,
        startMonth: 1,
        endMonth: 12,
      },
      {
        startDay: 31,
        endDay: 31,
        startMonth: 3,
        endMonth: 3,
      },
    ],
  },
  {
    contact: {
      displayName: 'Mgr. Radim Neubauer',
      name: 'Radim',
      surname: 'Neubauer',
      gender: 'Male',
      phone: '+420777000111',
      email: 'radim.neubauer@notary.com',
      completeAddress: 'Olšanská 12 13000, Prague, Czech Republic',
      postalCode: '13000',
    },
    dateRules: [
      {
        startDay: 13,
        endDay: 18,
        startMonth: 1,
        endMonth: 12,
      },
      {
        startDay: 31,
        endDay: 31,
        startMonth: 5,
        endMonth: 5,
      },
    ],
  },
  {
    contact: {
      displayName: 'JUDr. Markéta Menclerová',
      name: 'Markéta',
      surname: 'Menclerová',
      gender: 'Female',
      phone: '+420777111222',
      email: 'marketa.menclerova@notary.com',
      completeAddress: 'Jičínská 8 13000, Prague, Czech Republic',
      postalCode: '13000',
    },
    dateRules: [
      {
        startDay: 19,
        endDay: 24,
        startMonth: 1,
        endMonth: 12,
      },
      {
        startDay: 31,
        endDay: 31,
        startMonth: 7,
        endMonth: 7,
      },
    ],
  },
  {
    contact: {
      displayName: 'Mgr. Štěpán Stancl, LL.M.',
      name: 'Štěpán',
      surname: 'Stancl',
      gender: 'Male',
      phone: '+420777222333',
      email: 'stepan.stancl@notary.com',
      completeAddress: 'Husitská 15 13000, Prague, Czech Republic',
      postalCode: '13000',
    },
    dateRules: [
      {
        startDay: 25,
        endDay: 30,
        startMonth: 1,
        endMonth: 12,
      },
      {
        startDay: 31,
        endDay: 31,
        startMonth: 8,
        endMonth: 8,
      },
      {
        startDay: 31,
        endDay: 31,
        startMonth: 10,
        endMonth: 10,
      },
      {
        startDay: 31,
        endDay: 31,
        startMonth: 12,
        endMonth: 12,
      },
    ],
  },

  // Praha 4
  {
    contact: {
      displayName: 'Mgr. Markéta Nývltová',
      name: 'Markéta',
      surname: 'Nývltová',
      gender: 'Female',
      phone: '+420777444555',
      email: 'marketa.nyvltova@notary.com',
      completeAddress: 'Modřanská 72 14000, Prague, Czech Republic',
      postalCode: '14000',
    },
    dateRules: [{ startDay: 1, endDay: 31, startMonth: 1, endMonth: 1 }],
  },
  {
    contact: {
      displayName: 'JUDr. Ing. Ondřej Klička',
      name: 'Ondřej',
      surname: 'Klička',
      gender: 'Male',
      phone: '+420777555666',
      email: 'ondrej.klicka@notary.com',
      completeAddress: 'Branická 23 14000, Prague, Czech Republic',
      postalCode: '14000',
    },
    dateRules: [{ startDay: 1, endDay: 31, startMonth: 2, endMonth: 2 }],
  },
  {
    contact: {
      displayName: 'Mgr. Markéta Káninská',
      name: 'Markéta',
      surname: 'Káninská',
      gender: 'Female',
      phone: '+420777666777',
      email: 'marketa.kaninska@notary.com',
      completeAddress: 'Podolská 34 14000, Prague, Czech Republic',
      postalCode: '14000',
    },
    dateRules: [{ startDay: 1, endDay: 31, startMonth: 3, endMonth: 3 }],
  },
  {
    contact: {
      displayName: 'Mgr. František Novotný',
      name: 'František',
      surname: 'Novotný',
      gender: 'Male',
      phone: '+420777777888',
      email: 'frantisek.novotny@notary.com',
      completeAddress: 'Nad Malým Mýtem 11 14000, Prague, Czech Republic',
      postalCode: '14000',
    },
    dateRules: [{ startDay: 1, endDay: 30, startMonth: 4, endMonth: 4 }],
  },
  {
    contact: {
      displayName: 'Mgr. Šárka Tlašková',
      name: 'Šárka',
      surname: 'Tlašková',
      gender: 'Female',
      phone: '+420777888999',
      email: 'sarka.tlaskova@notary.com',
      completeAddress: 'Lhotka 7 14000, Prague, Czech Republic',
      postalCode: '14000',
    },
    dateRules: [{ startDay: 1, endDay: 31, startMonth: 5, endMonth: 5 }],
  },
  {
    contact: {
      displayName: 'Mgr. Petr Duda',
      name: 'Petr',
      surname: 'Duda',
      gender: 'Male',
      phone: '+420777888999',
      email: 'petr.duda@notary.com',
      completeAddress: 'Lhotka 7 14000, Prague, Czech Republic',
      postalCode: '14000',
    },
    dateRules: [{ startDay: 1, endDay: 31, startMonth: 6, endMonth: 6 }],
  },
  {
    contact: {
      displayName: 'Mgr. Šárka Matějčková',
      name: 'Šárka',
      surname: 'Matějčková',
      gender: 'Female',
      phone: '+420777888999',
      email: 'sarka.matejickova@notary.com',
      completeAddress: 'Lhotka 7 14000, Prague, Czech Republic',
      postalCode: '14000',
    },
    dateRules: [{ startDay: 1, endDay: 31, startMonth: 7, endMonth: 7 }],
  },
  {
    contact: {
      displayName: 'Mgr. Šárka Sýkorová',
      name: 'Šárka',
      surname: 'Sýkorová',
      gender: 'Female',
      phone: '+420777888999',
      email: 'sarka.sykorova@notary.com',
      completeAddress: 'Lhotka 7 14000, Prague, Czech Republic',
      postalCode: '14000',
    },
    dateRules: [{ startDay: 1, endDay: 31, startMonth: 8, endMonth: 8 }],
  },
  {
    contact: {
      displayName: 'Mgr. Jana Rybářová',
      name: 'Jana',
      surname: 'Rybářová',
      gender: 'Female',
      phone: '+420777888999',
      email: 'jana.rybarova@notary.com',
      completeAddress: 'Lhotka 7 14000, Prague, Czech Republic',
      postalCode: '14000',
    },
    dateRules: [{ startDay: 1, endDay: 31, startMonth: 9, endMonth: 9 }],
  },
  {
    contact: {
      displayName: 'Mgr. Petr Oulík',
      name: 'Petr',
      surname: 'Oulík',
      gender: 'Male',
      phone: '+420777888999',
      email: 'petr.oulik@notary.com',
      completeAddress: 'Lhotka 7 14000, Prague, Czech Republic',
      postalCode: '14000',
    },
    dateRules: [{ startDay: 1, endDay: 31, startMonth: 10, endMonth: 10 }],
  },
  {
    contact: {
      displayName: 'JUDr. Petra Habartová',
      name: 'Petra',
      surname: 'Habartová',
      gender: 'Female',
      phone: '+420777888999',
      email: 'petra.habartova@notary.com',
      completeAddress: 'Lhotka 7 14000, Prague, Czech Republic',
      postalCode: '14000',
    },
    dateRules: [{ startDay: 1, endDay: 31, startMonth: 11, endMonth: 11 }],
  },
  {
    contact: {
      displayName: 'JUDr. Miloslav Peterka',
      name: 'Miloslav',
      surname: 'Peterka',
      gender: 'Male',
      phone: '+420777888999',
      email: 'miloslav.peterka@notary.com',
      completeAddress: 'Lhotka 7 14000, Prague, Czech Republic',
      postalCode: '14000',
    },
    dateRules: [{ startDay: 1, endDay: 31, startMonth: 12, endMonth: 12 }],
  },

  // Praha 5
  {
    contact: {
      displayName: 'JUDr. Aleš Březina',
      name: 'Aleš',
      surname: 'Březina',
      gender: 'Male',
      phone: '+420777123456',
      email: 'ales.brezina@notary.com',
      completeAddress: 'Radlická 67 15000, Prague, Czech Republic',
      postalCode: '15000',
    },
    dateRules: [
      { startDay: 1, endDay: 3, startMonth: 1, endMonth: 12 },
      { startDay: 28, endDay: 28, startMonth: 1, endMonth: 5 },
    ],
  },
  {
    contact: {
      displayName: 'Mgr. Jakub Straděj',
      name: 'Jakub',
      surname: 'Straděj',
      gender: 'Male',
      phone: '+420777234567',
      email: 'jakub.stradej@notary.com',
      completeAddress: 'Nádražní 89 15000, Prague, Czech Republic',
      postalCode: '15000',
    },
    dateRules: [
      { startDay: 4, endDay: 6, startMonth: 1, endMonth: 12 },
      { startDay: 28, endDay: 28, startMonth: 6, endMonth: 10 },
    ],
  },
  {
    contact: {
      displayName: 'JUDr. Michaela Havlová',
      name: 'Michaela',
      surname: 'Havlová',
      gender: 'Female',
      phone: '+420777345678',
      email: 'michaela.havlova@notary.com',
      completeAddress: 'Štefánikova 12 15000, Prague, Czech Republic',
      postalCode: '15000',
    },
    dateRules: [
      { startDay: 8, endDay: 10, startMonth: 1, endMonth: 12 },
      { startDay: 28, endDay: 28, startMonth: 11, endMonth: 12 },
      { startDay: 29, endDay: 29, startMonth: 1, endMonth: 1 },
      { startDay: 29, endDay: 29, startMonth: 3, endMonth: 4 },
    ],
  },
  {
    contact: {
      displayName: 'JUDr. Alena Procházková',
      name: 'Alena',
      surname: 'Procházková',
      gender: 'Female',
      phone: '+420777456789',
      email: 'alena.prochazkova@notary.com',
      completeAddress: 'Strakonická 45 15000, Prague, Czech Republic',
      postalCode: '15000',
    },
    dateRules: [
      { startDay: 13, endDay: 15, startMonth: 1, endMonth: 12 },
      { startDay: 29, endDay: 29, startMonth: 5, endMonth: 9 },
    ],
  },
  {
    contact: {
      displayName: 'JUDr. Tereza Kubišová',
      name: 'Tereza',
      surname: 'Kubišová',
      gender: 'Female',
      phone: '+420777567890',
      email: 'tereza.kubisova@notary.com',
      completeAddress: 'Vítězná 9 15000, Prague, Czech Republic',
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
      displayName: 'JUDr. Lenka Leszay, Ph.D.',
      name: 'Lenka',
      surname: 'Leszay',
      gender: 'Female',
      phone: '+420777678901',
      email: 'lenka.leszay@notary.com',
      completeAddress: 'Šaldova 10 15000, Prague, Czech Republic',
      postalCode: '15000',
    },
    dateRules: [
      { startDay: 19, endDay: 21, startMonth: 1, endMonth: 12 },
      { startDay: 30, endDay: 30, startMonth: 4, endMonth: 7 },
      { startDay: 29, endDay: 29, startMonth: 2, endMonth: 2 },
    ],
  },
  {
    contact: {
      displayName: 'Mgr. Martin Diviš, LL.B.',
      name: 'Martin',
      surname: 'Diviš',
      gender: 'Male',
      phone: '+420777567890',
      email: 'martin.divis@notary.com',
      completeAddress: 'Ocelářská 12 15000, Prague, Czech Republic',
      postalCode: '15000',
    },
    dateRules: [
      { startDay: 25, endDay: 27, startMonth: 1, endMonth: 12 },
      { startDay: 30, endDay: 30, startMonth: 8, endMonth: 11 },
    ],
  },
  {
    contact: {
      displayName: 'JUDr. Jiří Svoboda',
      name: 'Jiří',
      surname: 'Svoboda',
      gender: 'Male',
      phone: '+420777234567',
      email: 'jiri.svoboda@notary.com',
      completeAddress: 'Vysočanská 21 15000, Prague, Czech Republic',
      postalCode: '15000',
    },
    dateRules: [
      { startDay: 22, endDay: 24, startMonth: 1, endMonth: 12 },
      { startDay: 30, endDay: 30, startMonth: 12, endMonth: 12 },
      { startDay: 31, endDay: 31, startMonth: 1, endMonth: 1 },
      { startDay: 31, endDay: 31, startMonth: 3, endMonth: 3 },
      { startDay: 31, endDay: 31, startMonth: 5, endMonth: 5 },
    ],
  },
  {
    contact: {
      displayName: 'Mgr. Václav Voda',
      name: 'Václav',
      surname: 'Voda',
      gender: 'Male',
      phone: '+420777956789',
      email: 'vaclav.voda@notary.com',
      completeAddress: 'Horní Měcholupy 34 15000, Prague, Czech Republic',
      postalCode: '15000',
    },
    dateRules: [
      { startDay: 7, endDay: 12, startMonth: 1, endMonth: 12 },
      { startDay: 31, endDay: 31, startMonth: 7, endMonth: 12 },
    ],
  },

  // Praha 6
  {
    contact: {
      displayName: 'Mgr. Naděžda Alšová',
      name: 'Naděžda',
      surname: 'Alšová',
      gender: 'Female',
      phone: '+420777123456',
      email: 'nadezda.alsova@notary.com',
      completeAddress: 'Na Petynce 20 16000, Prague, Czech Republic',
      postalCode: '16000',
    },
    dateRules: [
      { startDay: 1, endDay: 3, startMonth: 1, endMonth: 12 },
      { startDay: 27, endDay: 27, startMonth: 6, endMonth: 10 },
    ],
  },
  {
    contact: {
      displayName: 'JUDr. Ivana Krušková',
      name: 'Ivana',
      surname: 'Krušková',
      gender: 'Female',
      phone: '+420777234567',
      email: 'ivana.kruskova@notary.com',
      completeAddress: 'Pod Kaštany 8 16000, Prague, Czech Republic',
      postalCode: '16000',
    },
    dateRules: [
      { startDay: 4, endDay: 6, startMonth: 1, endMonth: 12 },
      { startDay: 7, endDay: 7, startMonth: 1, endMonth: 5 },
    ],
  },
  {
    contact: {
      displayName: 'Mgr. Jana Večerníková',
      name: 'Jana',
      surname: 'Večerníková',
      gender: 'Female',
      phone: '+420777345678',
      email: 'jana.vecernikova@notary.com',
      completeAddress: 'V Šáreckém údolí 15 16000, Prague, Czech Republic',
      postalCode: '16000',
    },
    dateRules: [
      { startDay: 9, endDay: 11, startMonth: 1, endMonth: 12 },
      { startDay: 8, endDay: 8, startMonth: 7, endMonth: 11 },
    ],
  },
  {
    contact: {
      displayName: 'JUDr. Martin Krčma',
      name: 'Martin',
      surname: 'Krčma',
      gender: 'Male',
      phone: '+420777456789',
      email: 'martin.krcma@notary.com',
      completeAddress: 'Na Ořechovce 33 16000, Prague, Czech Republic',
      postalCode: '16000',
    },
    dateRules: [
      { startDay: 12, endDay: 14, startMonth: 1, endMonth: 12 },
      { startDay: 8, endDay: 8, startMonth: 2, endMonth: 6 },
    ],
  },
  {
    contact: {
      displayName: 'Mgr. Olga Spoustová',
      name: 'Olga',
      surname: 'Spoustová',
      gender: 'Female',
      phone: '+420777567890',
      email: 'olga.spoustova@notary.com',
      completeAddress: 'Zelená 45 16000, Prague, Czech Republic',
      postalCode: '16000',
    },
    dateRules: [
      { startDay: 15, endDay: 17, startMonth: 1, endMonth: 12 },
      { startDay: 8, endDay: 8, startMonth: 12, endMonth: 12 },
    ],
  },
  {
    contact: {
      displayName: 'Mgr. Alexandra Červová',
      name: 'Alexandra',
      surname: 'Červová',
      gender: 'Female',
      phone: '+420777678901',
      email: 'alexandra.cervova@notary.com',
      completeAddress: 'Evropská 12 16000, Prague, Czech Republic',
      postalCode: '16000',
    },
    dateRules: [
      { startDay: 18, endDay: 20, startMonth: 1, endMonth: 12 },
      { startDay: 7, endDay: 7, startMonth: 9, endMonth: 12 },
      { startDay: 8, endDay: 8, startMonth: 1, endMonth: 1 },
    ],
  },
  {
    contact: {
      displayName: 'Mgr. Jan Hejtmánek',
      name: 'Jan',
      surname: 'Hejtmánek',
      gender: 'Male',
      phone: '+420777789012',
      email: 'jan.hejtmanek@notary.com',
      completeAddress: 'Na Špitálce 9 16000, Prague, Czech Republic',
      postalCode: '16000',
    },
    dateRules: [
      { startDay: 21, endDay: 23, startMonth: 1, endMonth: 12 },
      { startDay: 27, endDay: 27, startMonth: 11, endMonth: 12 },
      { startDay: 7, endDay: 7, startMonth: 6, endMonth: 8 },
    ],
  },
  {
    contact: {
      displayName: 'JUDr. Jan Krůta',
      name: 'Jan',
      surname: 'Krůta',
      gender: 'Male',
      phone: '+420777890123',
      email: 'jan.kruta@notary.com',
      completeAddress: 'Střešovická 14 16000, Prague, Czech Republic',
      postalCode: '16000',
    },
    dateRules: [
      { startDay: 24, endDay: 26, startMonth: 1, endMonth: 12 },
      { startDay: 27, endDay: 27, startMonth: 1, endMonth: 5 },
    ],
  },
  {
    contact: {
      displayName: 'JUDr. Blanka Čechová',
      name: 'Blanka',
      surname: 'Čechová',
      gender: 'Female',
      phone: '+420777901234',
      email: 'blanka.cechova@notary.com',
      completeAddress: 'Na Bateriích 17 16000, Prague, Czech Republic',
      postalCode: '16000',
    },
    dateRules: [{ startDay: 28, endDay: 31, startMonth: 1, endMonth: 12 }],
  },

  // Praha 7
  {
    contact: {
      displayName: 'Mgr. Eva Králová',
      name: 'Eva',
      surname: 'Králová',
      gender: 'Female',
      phone: '+420777345123',
      email: 'eva.kralova@notary.com',
      completeAddress: 'Letenská 25 17000, Prague, Czech Republic',
      postalCode: '17000',
    },
    dateRules: [{ startDay: 1, endDay: 31, startMonth: 1, endMonth: 3 }],
  },
  {
    contact: {
      displayName: 'JUDr. Ing. Vanda Pirková',
      name: 'Vanda',
      surname: 'Pirková',
      gender: 'Female',
      phone: '+420777456234',
      email: 'vanda.pirkova@notary.com',
      completeAddress: 'Milady Horákové 10 17000, Prague, Czech Republic',
      postalCode: '17000',
    },
    dateRules: [{ startDay: 1, endDay: 31, startMonth: 4, endMonth: 6 }],
  },
  {
    contact: {
      displayName: 'Mgr. Gajané Rejzková',
      name: 'Gajané',
      surname: 'Rejzková',
      gender: 'Female',
      phone: '+420777567345',
      email: 'gajane.rejzkova@notary.com',
      completeAddress: 'U Sparty 5 17000, Prague, Czech Republic',
      postalCode: '17000',
    },
    dateRules: [{ startDay: 1, endDay: 31, startMonth: 7, endMonth: 9 }],
  },
  {
    contact: {
      displayName: 'Mgr. Karel Uhlíř',
      name: 'Karel',
      surname: 'Uhlíř',
      gender: 'Male',
      phone: '+420777678456',
      email: 'karel.uhlir@notary.com',
      completeAddress: 'U Výstaviště 17 17000, Prague, Czech Republic',
      postalCode: '17000',
    },
    dateRules: [{ startDay: 1, endDay: 31, startMonth: 10, endMonth: 12 }],
  },

  // Praha 8
  {
    contact: {
      displayName: 'JUDr. Ing. Michael Sáblík',
      name: 'Michael',
      surname: 'Sáblík',
      gender: 'Male',
      phone: '+420777789012',
      email: 'michael.sablik@notary.com',
      completeAddress: 'Křižíkova 48 18600, Prague, Czech Republic',
      postalCode: '18600',
    },
    dateRules: [
      { startDay: 1, endDay: 6, startMonth: 1, endMonth: 12 },
      { startDay: 31, endDay: 31, startMonth: 1, endMonth: 1 },
      { startDay: 31, endDay: 31, startMonth: 7, endMonth: 7 },
      { startDay: 31, endDay: 31, startMonth: 12, endMonth: 12 },
    ],
  },
  {
    contact: {
      displayName: 'Mgr. Michaela Oswaldová',
      name: 'Michaela',
      surname: 'Oswaldová',
      gender: 'Female',
      phone: '+420777890123',
      email: 'michaela.oswaldova@notary.com',
      completeAddress: 'Karlínské náměstí 12 18600, Prague, Czech Republic',
      postalCode: '18600',
    },
    dateRules: [{ startDay: 7, endDay: 12, startMonth: 1, endMonth: 12 }],
  },
  {
    contact: {
      displayName: 'Mgr. Hana Remešová',
      name: 'Hana',
      surname: 'Remešová',
      gender: 'Female',
      phone: '+420777901234',
      email: 'hana.remesova@notary.com',
      completeAddress: 'Pernerova 7 18600, Prague, Czech Republic',
      postalCode: '18600',
    },
    dateRules: [
      { startDay: 13, endDay: 18, startMonth: 1, endMonth: 12 },
      { startDay: 31, endDay: 31, startMonth: 3, endMonth: 3 },
      { startDay: 31, endDay: 31, startMonth: 8, endMonth: 8 },
    ],
  },
  {
    contact: {
      displayName: 'Mgr. Šárka Zwierzynová',
      name: 'Šárka',
      surname: 'Zwierzynová',
      gender: 'Female',
      phone: '+420777012345',
      email: 'sarka.zwierzynova@notary.com',
      completeAddress: 'Thámova 20 18600, Prague, Czech Republic',
      postalCode: '18600',
    },
    dateRules: [{ startDay: 19, endDay: 24, startMonth: 1, endMonth: 12 }],
  },
  {
    contact: {
      displayName: 'JUDr. Eva Krejcarová',
      name: 'Eva',
      surname: 'Krejcarová',
      gender: 'Female',
      phone: '+420777123456',
      email: 'eva.krejcarova@notary.com',
      completeAddress: 'Šaldova 16 18600, Prague, Czech Republic',
      postalCode: '18600',
    },
    dateRules: [
      { startDay: 25, endDay: 30, startMonth: 1, endMonth: 12 },
      { startDay: 31, endDay: 31, startMonth: 5, endMonth: 5 },
      { startDay: 31, endDay: 31, startMonth: 10, endMonth: 10 },
    ],
  },

  // Praha 9
  {
    contact: {
      displayName: 'Mgr. Šimon Březina',
      name: 'Šimon',
      surname: 'Březina',
      gender: 'Male',
      phone: '+420777234567',
      email: 'simon.brezina@notary.com',
      completeAddress: 'Prosecká 10 19000, Prague, Czech Republic',
      postalCode: '19000',
    },
    dateRules: [
      { startDay: 1, endDay: 6, startMonth: 1, endMonth: 12 },
      { startDay: 31, endDay: 31, startMonth: 1, endMonth: 1 },
    ],
  },
  {
    contact: {
      displayName: 'Mgr. Soňa Glazarová',
      name: 'Soňa',
      surname: 'Glazarová',
      gender: 'Female',
      phone: '+420777345678',
      email: 'sona.glazarova@notary.com',
      completeAddress: 'Vysočanská 21 19000, Prague, Czech Republic',
      postalCode: '19000',
    },
    dateRules: [
      { startDay: 7, endDay: 12, startMonth: 1, endMonth: 12 },
      { startDay: 31, endDay: 31, startMonth: 3, endMonth: 3 },
    ],
  },
  {
    contact: {
      displayName: 'JUDr. Věra Sáblíková',
      name: 'Věra',
      surname: 'Sáblíková',
      gender: 'Female',
      phone: '+420777456789',
      email: 'vera.sablikova@notary.com',
      completeAddress: 'Kolbenova 50 19000, Prague, Czech Republic',
      postalCode: '19000',
    },
    dateRules: [
      { startDay: 13, endDay: 18, startMonth: 1, endMonth: 12 },
      { startDay: 31, endDay: 31, startMonth: 5, endMonth: 5 },
    ],
  },
  {
    contact: {
      displayName: 'Mgr. Petr Diviš',
      name: 'Petr',
      surname: 'Diviš',
      gender: 'Male',
      phone: '+420777567890',
      email: 'petr.divis@notary.com',
      completeAddress: 'Ocelářská 12 19000, Prague, Czech Republic',
      postalCode: '19000',
    },
    dateRules: [
      { startDay: 19, endDay: 24, startMonth: 1, endMonth: 12 },
      { startDay: 31, endDay: 31, startMonth: 7, endMonth: 7 },
    ],
  },
  {
    contact: {
      displayName: 'JUDr. Sylva Kotrbová',
      name: 'Sylva',
      surname: 'Kotrbová',
      gender: 'Female',
      phone: '+420777678901',
      email: 'sylva.kotrbova@notary.com',
      completeAddress: 'Letňanská 14 19000, Prague, Czech Republic',
      postalCode: '19000',
    },
    dateRules: [
      { startDay: 25, endDay: 30, startMonth: 1, endMonth: 12 },
      { startDay: 31, endDay: 31, startMonth: 8, endMonth: 8 },
      { startDay: 31, endDay: 31, startMonth: 10, endMonth: 10 },
      { startDay: 31, endDay: 31, startMonth: 12, endMonth: 12 },
    ],
  },

  // Praha 10
  {
    contact: {
      name: 'Šimon',
      surname: 'Klein',
      displayName: 'Mgr. Šimon Klein',
      gender: 'Male',
      phone: '+420777789012',
      email: 'simon.klein@notary.com',
      completeAddress: 'Vršovická 25 10100, Prague, Czech Republic',
      postalCode: '10100',
    },
    dateRules: [
      { startDay: 1, endDay: 3, startMonth: 1, endMonth: 12 },
      { startDay: 16, endDay: 16, startMonth: 1, endMonth: 4 },
      { startDay: 31, endDay: 31, startMonth: 12, endMonth: 12 },
    ],
  },
  {
    contact: {
      name: 'Jaroslava',
      surname: 'Voclová',
      displayName: 'JUDr. Jaroslava Voclová',
      gender: 'Female',
      phone: '+420777890123',
      email: 'jaroslava.voclova@notary.com',
      completeAddress: 'Eden Street 45 10100, Prague, Czech Republic',
      postalCode: '10100',
    },
    dateRules: [
      { startDay: 5, endDay: 7, startMonth: 1, endMonth: 12 },
      { startDay: 16, endDay: 16, startMonth: 5, endMonth: 8 },
      { startDay: 31, endDay: 31, startMonth: 3, endMonth: 3 },
    ],
  },
  {
    contact: {
      name: 'Martin',
      surname: 'Říha',
      displayName: 'Mgr. Martin Říha',
      gender: 'Male',
      phone: '+420777901234',
      email: 'martin.riha@notary.com',
      completeAddress: 'Záběhlická 66 10200, Prague, Czech Republic',
      postalCode: '10200',
    },
    dateRules: [
      { startDay: 9, endDay: 11, startMonth: 1, endMonth: 12 },
      { startDay: 16, endDay: 16, startMonth: 9, endMonth: 12 },
      { startDay: 31, endDay: 31, startMonth: 5, endMonth: 5 },
    ],
  },
  {
    contact: {
      name: 'Štěpán',
      surname: 'Nývlt',
      displayName: 'Mgr. Štěpán Nývlt',
      gender: 'Male',
      phone: '+420777912345',
      email: 'stepan.nyvlt@notary.com',
      completeAddress: 'Michle 72 10100, Prague, Czech Republic',
      postalCode: '10100',
    },
    dateRules: [
      { startDay: 13, endDay: 15, startMonth: 1, endMonth: 12 },
      { startDay: 20, endDay: 20, startMonth: 1, endMonth: 4 },
      { startDay: 31, endDay: 31, startMonth: 7, endMonth: 7 },
    ],
  },
  {
    contact: {
      name: 'Daniela',
      surname: 'Anderson',
      displayName: 'JUDr. Daniela Anderson',
      gender: 'Female',
      phone: '+420777923456',
      email: 'daniela.anderson@notary.com',
      completeAddress: 'Vinohrady 88 10100, Prague, Czech Republic',
      postalCode: '10100',
    },
    dateRules: [
      { startDay: 17, endDay: 19, startMonth: 1, endMonth: 12 },
      { startDay: 20, endDay: 20, startMonth: 5, endMonth: 8 },
      { startDay: 31, endDay: 31, startMonth: 8, endMonth: 8 },
    ],
  },
  {
    contact: {
      name: 'Věra',
      surname: 'Dundová',
      displayName: 'JUDr. Věra Dundová',
      gender: 'Female',
      phone: '+420777934567',
      email: 'vera.dundova@notary.com',
      completeAddress: 'Zahradní Město 93 10200, Prague, Czech Republic',
      postalCode: '10200',
    },
    dateRules: [
      { startDay: 21, endDay: 23, startMonth: 1, endMonth: 12 },
      { startDay: 20, endDay: 20, startMonth: 9, endMonth: 12 },
    ],
  },
  {
    contact: {
      name: 'Jana',
      surname: 'Zangiová',
      displayName: 'JUDr. Jana Zangiová',
      gender: 'Female',
      phone: '+420777945678',
      email: 'jana.zangiova@notary.com',
      completeAddress: 'Strašnice 12 10000, Prague, Czech Republic',
      postalCode: '10000',
    },
    dateRules: [
      { startDay: 24, endDay: 26, startMonth: 1, endMonth: 12 },
      { startDay: 27, endDay: 27, startMonth: 1, endMonth: 6 },
      { startDay: 31, endDay: 31, startMonth: 10, endMonth: 10 },
    ],
  },
  {
    contact: {
      name: 'Martin',
      surname: 'Muzikář',
      displayName: 'JUDr. Ing. Martin Muzikář',
      gender: 'Male',
      phone: '+420777956789',
      email: 'martin.muzikar@notary.com',
      completeAddress: 'Horní Měcholupy 34 10900, Prague, Czech Republic',
      postalCode: '10900',
    },
    dateRules: [
      { startDay: 28, endDay: 30, startMonth: 1, endMonth: 12 },
      { startDay: 27, endDay: 27, startMonth: 5, endMonth: 8 },
      { startDay: 31, endDay: 31, startMonth: 12, endMonth: 12 },
    ],
  },
  {
    contact: {
      name: 'Lucie',
      surname: 'Foukalová',
      displayName: 'JUDr. Lucie Foukalová',
      gender: 'Female',
      phone: '+420777967890',
      email: 'lucie.foukalova@notary.com',
      completeAddress: 'Hostivařská 17 10200, Prague, Czech Republic',
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

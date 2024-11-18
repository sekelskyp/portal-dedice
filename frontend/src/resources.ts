const resources = {
  shared: {
    CTA: {
      signIn: 'Přihlásit se',
      signUp: 'Registrovat se',
    },
  },
  auth: {
    pages: {
      signIn: {
        title: 'Přihlášení',
        noAccount: 'Nemáte účet?',
      },
      signOut: {
        signedOut: 'Byly jste odhlášeni.',
      },
      signUp: {
        title: 'Registrace',
        emailConfirmation: {
          title: 'Ověření emailové adresy',
          desc: 'Pro dokončení registrace prosím klikněte na odkaz, který jsme Vám zaslali mailem',
        },
        failed: {
          title: 'Registrace se nezdařila',
          desc: 'Zkuste to později nebo kontaktujte správce systému',
        },
      },
    },
    forms: {
      shared: {
        email: {
          label: 'E-mailová adresa',
          placeholder: 'priklad@email.cz',
        },
        password: 'Heslo',
      },
      signUp: {
        name: 'Jméno',
        surname: 'Příjmení',
        gender: {
          label: 'Pohlaví',
          placeholder: 'Zvolte pohlaví',
          values: {
            male: 'Muž',
            female: 'Žena',
          },
        },
        confirmPassword: 'Potvrdit heslo',
        country: 'Země',
        city: 'Město',
        street: 'Ulice',
        postalCode: 'PSČ',
        dateOfBirth: 'Datum narození',
      },
    },
  },
  portal: {
    pages: {
      proceedings: {
        newProceeding: 'Nové řízení',
      },
      newProceeding: {
        title: 'Založení nového řízení',
        subtitle:
          'Pro založení nového dědického řízení prosím vyplňte nasledující formulář.',
      },
    },
    sideBar: {
      profile: 'Můj profil',
      proceedings: 'Moje řízení',
      settings: 'Nastavení',
    },
    forms: {
      proceedingForm: {
        name: 'Jméno',
        surname: 'Příjmení',
        dateOfBirth: 'Datum narození',
        dateOfDeath: 'Datum úmrtí',
        address: 'Trvalé bydliště',
        email: 'Emailová adresa',
        groups: {
          deceased: 'Identifikace zůstavitele',
          deceasedHelper: 'Vyplňte prosím informace o zůstaviteli.',
          contactPerson: 'Kontaktní osoba',
          contactPersonHelper: 'Vyplňte prosím informace o kontaktní osobě.',
          beneficiaries: 'Dědici po zůstaviteli',
          beneficiariesHelper:
            'Přidejte všechny dědice, kteří se mají podílet na dědictví.',
        },
        addBeneficiary: 'Přidat dědice',
        createProceeding: 'Založit řízení',
      },
      assetForm: {
        name: 'Jméno',
        surname: 'Příjmení',
        dateOfBirth: 'Datum narození',
        dateOfDeath: 'Datum úmrtí',
        address: 'Trvalé bydliště',
        email: 'Emailová adresa',
        groups: {
          bankAccount: 'Měl zůstavitel bankovní účet?',
          company: 'Účastnil se v obchodní společnosti?',
          car: 'Měl zůstavitel auto?',
          valuables: 'Vlastnil zůstavitel nějaké cennosti?',
          others: 'Vlastnil zůstavitel ještě něco jiného?',
        },
      },
    },
  },
}

export default resources

import { ReactNode } from 'react'
import { Box, Heading, List, ListItem, Text, VStack } from '@chakra-ui/react'

const TermsListItem = ({ children }: { children: ReactNode }) => (
  <ListItem lineHeight={{ base: 'tall', md: 'taller' }} textAlign="justify">
    {children}
  </ListItem>
)

export function TermsOfService() {
  return (
    <Box maxW="3xl" mx="auto" py={[6, 8, 10]} px={[4, 5, 6]}>
      <Text textAlign="center" color="primary.500" fontWeight="bold" mb={8}>
        Platné od 1. ledna 2025
      </Text>
      <Heading size={['xl', '3xl']} textAlign="center" mt={2}>
        Podmínky užívání
      </Heading>
      <Text textAlign="justify" mt={4}>
        Vstupem na naši webovou stránku souhlasíte s tím, že budete vázáni
        těmito smluvními podmínkami, a uznáváte odpovědnost za dodržování všech
        platných místních zákonů.
      </Text>
      <VStack
        align="start"
        mt={[6, 8, 10]}
        spaceX={[4, 6, 8]}
        spaceY={[4, 6, 8]}
      >
        <Box>
          <Heading size={['xl', '2xl']}>Přehled</Heading>
          <Text mt="2" textAlign="justify">
            Tyto smluvní podmínky (dále jen „podmínky“) upravují vaše používání
            aplikace Portál dědice. Používáním této webové stránky potvrzujete,
            že jste si přečetli, porozuměli a souhlasíte s dodržováním těchto
            podmínek.
          </Text>
          <Heading size={['xl', '2xl']} mt={8}>
            Podmínky užívání aplikace Portál dědice
          </Heading>
          <List.Root
            mt={4}
            ml={4}
            as="ol"
            listStyle="decimal"
            spaceY={[1.5, 2]}
            fontSize={{ base: 'sm', md: 'md' }}
            mx={{ base: 6, md: 0 }}
          >
            <TermsListItem>
              <strong>Úvodní ustanovení</strong> 1.1 Tyto Podmínky upravují
              právní vztah mezi uživatelem aplikace Portál dědice (dále jen
              "Aplikace") a jejím provozovatelem, společností Tým 3 - Vysoká
              škola ekonomická v Praze, se sídlem nám. Winstona Churchilla
              1938/4, 120 00 Praha 3 - Žižkov (dále jen "Provozovatel"). 1.2
              Používáním Aplikace uživatel potvrzuje, že se seznámil s těmito
              Podmínkami a souhlasí s nimi.
            </TermsListItem>
            <TermsListItem>
              <strong>Registrace a uživatelský účet</strong> 2.1 Pro využívání
              plných funkcí Aplikace je nutná registrace uživatelského účtu. 2.2
              Uživatel je povinen uvádět pravdivé a aktuální údaje. 2.3 Účet je
              nepřenosný a uživatel je povinen chránit své přihlašovací údaje.
            </TermsListItem>
            <TermsListItem>
              <strong>Používání aplikace</strong> 3.1 Aplikace je určena k
              online správě a komunikaci v rámci pozůstalostního řízení. 3.2
              Uživatel se zavazuje používat Aplikaci v souladu s platnými
              právními předpisy a těmito Podmínkami. 3.3 Je zakázáno zneužívat
              Aplikaci k nezákonným účelům nebo narušovat její funkčnost.
            </TermsListItem>
            <TermsListItem>
              <strong>Práva a povinnosti provozovatele</strong> 4.1 Provozovatel
              má právo provádět údržbu, aktualizace a změny v Aplikaci. 4.2
              Provozovatel nenese odpovědnost za škody způsobené nesprávným
              použitím Aplikace. 4.3 Provozovatel si vyhrazuje právo kdykoliv
              ukončit nebo omezit přístup k Aplikaci.
            </TermsListItem>
            <TermsListItem>
              <strong>Ochrana osobních údajů</strong> 5.1 Osobní údaje uživatelů
              jsou zpracovávány v souladu s platnými právními předpisy a
              Zásadami ochrany osobních údajů. 5.2 Uživatel souhlasí se
              zpracováním osobních údajů v rozsahu nezbytném pro provoz
              Aplikace.
            </TermsListItem>
            <TermsListItem>
              <strong>Odpovědnost uživatele</strong> 6.1 Uživatel je odpovědný
              za veškeré aktivity prováděné prostřednictvím svého účtu. 6.2
              Uživatel je povinen nahlásit jakékoliv podezřelé aktivity na svém
              účtu Provozovateli.
            </TermsListItem>
            <TermsListItem>
              <strong>Změny podmínek</strong> 7.1 Provozovatel si vyhrazuje
              právo kdykoliv změnit tyto Podmínky. 7.2 O změnách bude uživatel
              informován prostřednictvím Aplikace.
            </TermsListItem>
            <TermsListItem>
              <strong>Závěrečná ustanovení</strong> 8.1 Tyto Podmínky nabývají
              platnosti dnem jejich zveřejnění. 8.2 Práva a povinnosti
              neupravené těmito Podmínkami se řídí platnými právními předpisy.
            </TermsListItem>
          </List.Root>
        </Box>
        <Box>
          <Text
            mt={[6, 8]}
            textAlign="center"
            color="gray.400"
            fontStyle="italic"
          >
            Tento text je pouze ukázkový pro potřeby aplikace a neodpovídá
            skutečnosti. Veškeré uvedené informace jsou fiktivní a
            nereprezentují reálné entity či osoby.
          </Text>
          <Text mt={2} textAlign="center" color="gray.400" fontStyle="italic">
            (Text podmínek byl vygenerován generativní umělou inteligencí.)
          </Text>
        </Box>
      </VStack>
    </Box>
  )
}

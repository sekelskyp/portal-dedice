import { ReactNode } from 'react'
import { Heading, Separator, Text, VStack } from '@chakra-ui/react'

import { Box } from '@frontend/shared/design-system'

const GuideText = ({ children }: { children: ReactNode }) => (
  <Text textAlign="justify" fontSize={['md', 'lg']}>
    {children}
  </Text>
)

const GuideHeading = ({ children }: { children: ReactNode }) => (
  <Heading size={['lg', 'xl']} mb={4}>
    {children}
  </Heading>
)

export function GuidePage() {
  return (
    <Box maxW="4xl" mx="auto" py={[6, 8, 10]} px={[4, 5, 6]}>
      <Heading size={['xl', '3xl']} textAlign="center" mt={2}>
        Jak to funguje?
      </Heading>
      <Text fontSize={['md', 'lg']} textAlign="center" my={8}>
        Portál dědice je moderní platforma, která propojuje dědice a notáře, aby
        usnadnila a zrychlila proces pozůstalostního řízení. Naše aplikace
        nabízí intuitivní a uživatelsky přívětivé prostředí, kde můžete vyřešit
        vše potřebné z pohodlí domova.
      </Text>
      <VStack gap={8} align="start" mb={8} mx={[0, 4]}>
        <Box>
          <GuideHeading>Nachytřovadlo</GuideHeading>
          <GuideText>
            Nachytřovadlo je váš průvodce celým procesem pozůstalostního řízení.
            Tento chytrý nástroj poskytuje informace, provádí vás krok za krokem
            a zajišťuje, že budete mít vše připraveno.
          </GuideText>
        </Box>
        <Separator />
        <Box>
          <GuideHeading>Modelace majetku a plánování</GuideHeading>
          <GuideText>
            Vyzkoušejte si modelaci rozdělení majetku mezi účastníky a připravte
            se na klíčová rozhodnutí díky našim simulacím.
          </GuideText>
        </Box>
        <Separator />
        <Box>
          <GuideHeading>Komunikace mezi účastníky</GuideHeading>
          <GuideText>
            Portál umožňuje snadnou komunikaci s notářem online. Řešte předběžné
            šetření, konzultujte záležitosti v chatu a získávejte důležité
            informace pohodlně z domova. Sdílejte informace a domlouvejte se s
            ostatními účastníky řízení díky integrovanému chatu přímo v
            aplikaci.
          </GuideText>
        </Box>
        <Separator />
        <Box>
          <GuideHeading>Nástroje pro notáře</GuideHeading>
          <GuideText>
            Notáři mohou spravovat aktivní řízení, posílat dokumenty a
            komunikovat s dědici přímo přes platformu, což zefektivňuje celý
            proces.
          </GuideText>
        </Box>
      </VStack>
    </Box>
  )
}

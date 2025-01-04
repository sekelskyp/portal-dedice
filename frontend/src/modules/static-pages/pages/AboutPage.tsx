import { ReactNode } from 'react'
import { Flex, Heading, Image, Text, VStack } from '@chakra-ui/react'

import { Box } from '@frontend/shared/design-system'

const CustomText = ({ children }: { children: ReactNode }) => (
  <Text textAlign="justify" mt={4} fontSize={['md', 'lg']}>
    {children}
  </Text>
)

export function AboutPage() {
  return (
    <Box maxW="3xl" mx="auto" py={[6, 8, 10]} px={[4, 5, 6]}>
      <Heading size={['xl', '3xl']} textAlign="center" mt={2}>
        O nás
      </Heading>
      <Flex justifyContent="center" mt={4}>
        <Image
          src={'/holding-hands.jpg'}
          fit="cover"
          w={{ base: 32, md: 64 }}
          h={{ base: 32, md: 64 }}
          bg="gray.100"
          loading="lazy"
          opacity={0.8}
          borderRadius={'full'}
        />
      </Flex>
      <Text textAlign="justify" mt={8} fontSize={['md', 'lg']}>
        Jsme <strong>Tým 3</strong> z Vysoké školy ekonomické v Praze, který ve
        spolupráci s firmou <strong>Applifting</strong> vytvořil inovativní
        platformu Portál dědice. Naším cílem bylo zjednodušit a zpřístupnit
        proces pozůstalostního řízení pro všechny zúčastněné strany.
      </Text>
      <VStack
        align="start"
        mt={[6, 8, 10]}
        spaceX={[4, 6, 8]}
        spaceY={[4, 6, 8]}
      >
        <Box>
          <Heading size={['xl', '2xl']}>
            Portál dědice – digitalizace pozůstalostního řízení
          </Heading>
          <CustomText>
            Portál dědice je inovativní platforma, která propojuje dědice a
            notáře na jednom místě. Cílem je zjednodušit a urychlit proces
            pozůstalostního řízení prostřednictvím online prostředí.
          </CustomText>
          <CustomText>
            Na Portálu dědice můžete provést předběžné šetření online,
            komunikovat s notářem pomocí chatu a efektivně spravovat dědické
            řízení. Díky nástroji „Nachytřovadlo“ vás platforma provede celým
            procesem krok za krokem, poskytne jasné instrukce a pomůže vám lépe
            porozumět jednotlivým fázím dědického řízení.
          </CustomText>
          <CustomText>
            S Portálem dědice šetříte čas, snižujete administrativní zátěž a
            máte jistotu, že vše probíhá v souladu s právními předpisy.
          </CustomText>
          <Text
            fontSize={['md', 'lg']}
            mt={8}
            textAlign="justify"
            fontStyle="italic"
            color="gray.500"
          >
            Portál dědice – Váš spolehlivý nástroj v náročných životních
            situacích.
          </Text>
        </Box>
      </VStack>
    </Box>
  )
}

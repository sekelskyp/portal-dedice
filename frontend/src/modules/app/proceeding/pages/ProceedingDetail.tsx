import { Button, Grid, Heading, Spinner, Stack, Text } from '@chakra-ui/react'
import { CalculatorIcon, MessageSquareTextIcon, SendIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

import { GetProceedingByIdQuery } from '@frontend/gql/graphql'
import { useAuth } from '@frontend/modules/auth'
import { Alert } from '@frontend/shared/design-system'
import { RouterNavLink } from '@frontend/shared/navigation/atoms'
import { route } from '@shared/route'

import { BeneficiaryBadge } from '../components/BeneficiaryBadge'

export const ProceedingDetail = ({
  proceeding,
}: {
  proceeding: GetProceedingByIdQuery['getProceedingById']
}) => {
  const user = useAuth()
  const assets = proceeding?.procedureAssets
  const totalAssetsValue = assets?.reduce((sum, asset) => sum + asset.value, 0)
  return proceeding ? (
    <Stack gap={4}>
      <Grid gap={4} templateColumns={{ base: '1fr', lg: '1fr 1fr' }}>
        <Stack>
          <Heading
            size={{ base: 'lg', lg: 'xl' }}
            textAlign={{ base: 'center', lg: 'left' }}
          >
            Hlavní kontaktní osoba
          </Heading>

          {proceeding.mainBeneficiary?.user ? (
            <BeneficiaryBadge
              beneficiaryContact={proceeding.mainBeneficiary.user}
            />
          ) : (
            <Alert status="warning">Dědic bez kontaktních údajů.</Alert>
          )}
        </Stack>
        <Stack>
          <Heading
            size={{ base: 'lg', lg: 'xl' }}
            textAlign={{ base: 'center', lg: 'left' }}
          >
            Přiřazený notář
          </Heading>
          {proceeding.notary?.user ? (
            <BeneficiaryBadge beneficiaryContact={proceeding.notary?.user} />
          ) : (
            <Alert status="warning">Notář bez kontaktních údajů.</Alert>
          )}
        </Stack>
      </Grid>
      <Stack>
        <Heading
          size={{ base: 'lg', lg: 'xl' }}
          textAlign={{ base: 'center', lg: 'left' }}
        >
          Seznam dědiců
        </Heading>
        {proceeding.beneficiaries?.map((beneficiary) =>
          !!beneficiary.user ? (
            <BeneficiaryBadge
              key={beneficiary.id}
              beneficiaryContact={{
                ...beneficiary.user,
              }}
            />
          ) : (
            <Alert status="warning" key={beneficiary.id}>
              Dědic bez kontaktních údajů.
            </Alert>
          )
        )}
      </Stack>
      <Heading
        size={{ base: 'lg', lg: 'xl' }}
        textAlign={{ base: 'center', lg: 'left' }}
      >
        Celková hodnota majetku
      </Heading>
      {assets?.length === 0 ? (
        <Stack alignItems={{ base: 'center', lg: 'start' }}>
          <Text fontSize="md">Tuto hodnotu zatím neznáme.</Text>
          <Button as={Link} disabled width="fit-content" rounded="full">
            Modelace
            <CalculatorIcon />
          </Button>
        </Stack>
      ) : (
        <Text fontSize="lg" textAlign={{ base: 'center', lg: 'left' }}>
          {totalAssetsValue},- Kč
        </Text>
      )}

      <Heading
        size={{ base: 'lg', lg: 'xl' }}
        textAlign={{ base: 'center', lg: 'left' }}
      >
        Návrh vypořádaní ze strany zůstavitele
      </Heading>
      <Text fontSize="md" textAlign={{ base: 'center', lg: 'left' }}>
        Tuto hodnotu zatím neznáme.
      </Text>
      <Stack direction={{ base: 'column', lg: 'row' }} justifyContent="center">
        {user.user?.type === 'User' ? (
          <>
            <Button as={Link} disabled rounded="full">
              Modelace vyrovnaní
              <CalculatorIcon />
            </Button>
            <RouterNavLink to={route.chatId(proceeding.id)} rounded="full">
              Chat s notářem
              <MessageSquareTextIcon />
            </RouterNavLink>
            <RouterNavLink
              to={route.chatIdHistory(proceeding.id)}
              rounded="full"
            >
              Chatová historie řízení
              <MessageSquareTextIcon />
            </RouterNavLink>
          </>
        ) : (
          <>
            <RouterNavLink to={route.newEmail(proceeding.id)} rounded={'full'}>
              Hromadná zpráva všem dědicům
              <SendIcon />
            </RouterNavLink>
            <RouterNavLink
              to={route.chatIdHistory(proceeding.id)}
              rounded="full"
            >
              Chatová historie řízení
              <MessageSquareTextIcon />
            </RouterNavLink>
          </>
        )}
      </Stack>
    </Stack>
  ) : (
    <Spinner size="xl" />
  )
}

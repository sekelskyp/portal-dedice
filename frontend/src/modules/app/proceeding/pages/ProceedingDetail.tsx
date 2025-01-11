import { Button, Grid, Heading, Spinner, Stack, Text } from '@chakra-ui/react'
import { CalculatorIcon, MessageSquareTextIcon, SendIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

import { useAuth } from '@frontend/modules/auth'
import { RouterNavLink } from '@frontend/shared/navigation/atoms'
import { route } from '@shared/route'

import { AddBeneficiaryButton } from '../components/AddBeneficiaryButton'
import { AssignMainBeneficiaryButton } from '../components/AssignMainBeneficiaryButton'
import { useProceedingContext } from '../components/ProceedingLayout'
import { UserBadge } from '../components/UserBadge'

export const ProceedingDetail = () => {
  const { user } = useAuth()

  const { proceeding, isEditable, removeBeneficiary, removeMainBeneficiary } =
    useProceedingContext()

  const assets = proceeding?.procedureAssets
  const totalAssetsValue = assets?.reduce((sum, asset) => sum + asset.value, 0)

  return proceeding ? (
    <Stack gap={6}>
      <Grid gap={4} templateColumns={{ base: '1fr', lg: '1fr 1fr' }}>
        {(proceeding.mainBeneficiary || isEditable) && (
          <Stack gap={4}>
            <Heading
              size={{ base: 'lg', lg: 'xl' }}
              textAlign={{ base: 'center', lg: 'left' }}
              alignItems={'end'}
            >
              Hlavní kontaktní osoba
            </Heading>

            {proceeding.mainBeneficiary?.user ? (
              <UserBadge
                user={proceeding.mainBeneficiary?.user}
                issueText="Dědic bez kontaktních údajů."
                removable={isEditable}
                onRemoveClick={() => removeMainBeneficiary()}
              />
            ) : (
              <AssignMainBeneficiaryButton />
            )}
          </Stack>
        )}
        <Stack gap={4}>
          <Heading
            size={{ base: 'lg', lg: 'xl' }}
            textAlign={{ base: 'center', lg: 'left' }}
          >
            Přiřazený notář
          </Heading>
          <UserBadge
            user={proceeding.notary?.user}
            issueText="Notář bez kontaktních údajů."
          />
        </Stack>
      </Grid>
      <Stack gap={4}>
        <Heading
          size={{ base: 'lg', lg: 'xl' }}
          textAlign={{ base: 'center', lg: 'left' }}
        >
          Seznam dědiců
        </Heading>
        <Grid gap={4} templateColumns={{ base: '1fr', lg: '1fr 1fr' }}>
          {proceeding.beneficiaries?.map((beneficiary) => (
            <UserBadge
              key={beneficiary.id}
              user={beneficiary.user}
              issueText="Dědic bez kontaktních údajů."
              removable={isEditable}
              onRemoveClick={() => {
                removeBeneficiary(+beneficiary.id)
              }}
            />
          ))}
          {isEditable && <AddBeneficiaryButton />}
        </Grid>
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
        {user?.type === 'User' ? (
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

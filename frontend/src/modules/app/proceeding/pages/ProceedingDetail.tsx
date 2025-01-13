import { Grid, Heading, Separator, Spinner, Stack } from '@chakra-ui/react'
import { MessageSquareTextIcon, SendIcon } from 'lucide-react'

import { useAuth } from '@frontend/modules/auth'
import { RouterNavLink } from '@frontend/shared/navigation/atoms'
import { route } from '@shared/route'

import { AddBeneficiaryButton } from '../components/AddBeneficiaryButton'
import { AssignMainBeneficiaryButton } from '../components/AssignMainBeneficiaryButton'
import { DeceasedPersonInfo } from '../components/DeceasedPersonInfo'
import { useProceedingContext } from '../components/ProceedingLayout'
import { UserBadge } from '../components/UserBadge'

export const ProceedingDetail = () => {
  const { user } = useAuth()

  const { proceeding, isEditable, removeBeneficiary, removeMainBeneficiary } =
    useProceedingContext()

  return proceeding ? (
    <Stack gap={6}>
      <Grid gap={4} templateColumns={{ base: '1fr', lg: '1fr 1fr' }}>
        <Stack gap={2}>
          <Heading
            size={{ base: 'lg', lg: 'xl' }}
            textAlign={{ base: 'center', lg: 'left' }}
            alignItems={'end'}
          >
            Zůstavitel
          </Heading>

          <DeceasedPersonInfo />
        </Stack>
        <Stack gap={2}>
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

      <Separator />

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

      <Separator />

      <Stack direction={{ base: 'column', lg: 'row' }} justifyContent="center">
        {user?.type === 'User' ? (
          <>
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

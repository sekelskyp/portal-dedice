import { Page } from '@frontend/shared/layout'

import { PasswordResetForm } from '../components/PasswordResetForm'

export function PasswordResetPage() {
  const handlePasswordResetFormSubmit = (data: { email: string }) =>
    console.log(data)

  return (
    <Page>
      <PasswordResetForm
        onSubmit={handlePasswordResetFormSubmit}
      ></PasswordResetForm>
    </Page>
  )
}

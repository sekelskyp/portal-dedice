import { gql, useLazyQuery } from '@apollo/client'

const VALIDATE_USER = gql`
  query validateUser($email: String!) {
    getUserByEmail(email: $email) {
      id
    }
  }
`

export default function useValidateUser() {
  const [validateUser] = useLazyQuery(VALIDATE_USER)

  const validate = async (email: string) => {
    const { data } = await validateUser({ variables: { email } })
    return {
      isValid: !!data.getUserByEmail.id,
      userId: data.getUserByEmail.id,
    }
  }

  return validate
}

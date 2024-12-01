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
    try {
      const { data, error } = await validateUser({
        variables: { email },
        fetchPolicy: 'cache-first',
      })

      if (error) {
        throw new Error('Validation failed')
      }

      return {
        isValid: !!data?.getUserByEmail?.id,
        userId: data?.getUserByEmail?.id,
      }
    } catch (error) {
      console.error('User validation error:', error)
      throw new Error('Nepodařilo se ověřit email')
    }
  }

  return validate
}

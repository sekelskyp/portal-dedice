import { useLocation } from 'react-router-dom'

export function useVerificationToken() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const token = queryParams.get('token')

  return {
    token,
  }
}

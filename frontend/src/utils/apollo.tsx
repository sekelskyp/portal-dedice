import 'cross-fetch/polyfill'

import { ReactNode, useCallback, useMemo } from 'react'
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  from,
  InMemoryCache,
  split,
} from '@apollo/client'
import { NetworkError } from '@apollo/client/errors'
import { onError } from '@apollo/client/link/error'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import { GraphQLFormattedError } from 'graphql'
import { createClient } from 'graphql-ws'

import { config } from '@frontend/config'
import { useAuth } from '@frontend/modules/auth'

type Props = {
  children: ReactNode
}

export function EnhancedApolloProvider({ children }: Props) {
  const { token, signOut } = useAuth()

  const handleSignOut = useCallback(() => {
    signOut()
  }, [signOut])

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    })

    return forward(operation)
  })

  const logoutLink = onError(({ graphQLErrors, networkError }) => {
    if (
      hasUnauthenticatedErrorCode(graphQLErrors) ||
      hasNetworkStatusCode(networkError, 401)
    ) {
      handleSignOut()
    }
  })

  const wsLink = new GraphQLWsLink(
    createClient({
      url: config.GRAPHQL_API.replace('http', 'ws'),
      on: {
        connected: () => console.log('WS Connected'),
        error: (error) => console.log('WS Error:', error),
        closed: () => console.log('WS Closed'),
      },
    })
  )

  const httpLink = from([logoutLink, authLink, uploadLink])

  // Create the split link
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink,
    httpLink
  )

  const cache = useMemo(() => new InMemoryCache(), [])

  const client = new ApolloClient({
    link: splitLink,
    cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
      query: {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'cache-first',
      },
    },
    connectToDevTools: process.env.NODE_ENV === 'development',
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

const UNAUTHENTICATED_CODE = 'UNAUTHENTICATED'

const hasUnauthenticatedErrorCode = (
  errors: readonly GraphQLFormattedError[] | undefined
) => {
  return (
    errors &&
    errors.some((error) => error.extensions?.code === UNAUTHENTICATED_CODE)
  )
}

const hasNetworkStatusCode = (
  error: NetworkError | undefined,
  code: number
) => {
  return error && 'statusCode' in error && error.statusCode === code
}

const uploadLink = createUploadLink({
  uri: config.GRAPHQL_API,
  headers: {
    'Apollo-Require-Preflight': 'ok', // This is for CSRF
  },
})

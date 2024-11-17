import 'ts-node/register/transpile-only'
import 'tsconfig-paths/register'
import 'reflect-metadata'

import { ApolloServer } from '@apollo/server'
import {
  ExpressContextFunctionArgument,
  expressMiddleware,
} from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { addMocksToSchema } from '@graphql-tools/mock'
import { createPubSub } from '@graphql-yoga/subscription'
import cors from 'cors'
import express from 'express'
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js'
import { useServer } from 'graphql-ws/lib/use/ws'
import * as http from 'http'
import { buildSchema } from 'type-graphql'
import { WebSocketServer } from 'ws'

import { MOCKS, PORT } from '@backend/config'
import { getConnection } from '@backend/db/db'
import { getBeneficiaryRepository } from '@backend/graphql/modules/beneficiary/beneficiaryRepository'
import { BeneficiaryResolver } from '@backend/graphql/modules/beneficiary/beneficiaryResolver'
import { getContactRepository } from '@backend/graphql/modules/contact/contactRepository'
import { ContactResolver } from '@backend/graphql/modules/contact/contactResolver'
import { getEmailConfirmationTokenRepository } from '@backend/graphql/modules/emailConfirmationToken/emailConfirmationTokenRepository'
import { EmptyResolver } from '@backend/graphql/modules/empty/emptyResolver'
import { getInheritanceProcedureRepository } from '@backend/graphql/modules/inheritanceProcedure/inheritaceProcedureRepository'
import { InheritanceProcedureResolver } from '@backend/graphql/modules/inheritanceProcedure/inheritanceProcedureResolver'
import { getNotaryRepository } from '@backend/graphql/modules/notary/notaryRepository'
import { NotaryResolver } from '@backend/graphql/modules/notary/notaryResolver'
import { getNotaryDateRuleRepository } from '@backend/graphql/modules/notaryDateRule/notaryDateRuleRepository'
import { getPasswordResetTokenRepository } from '@backend/graphql/modules/passwordResetToken/passwordResetTokenRepository'
import { getUserRepository } from '@backend/graphql/modules/user/userRepository'
import { UserResolver } from '@backend/graphql/modules/user/userResolver'
import { parseAndVerifyJWT } from '@backend/libs/jwt'
import { mockResolvers } from '@backend/mocks/mocks'
import { CustomContext } from '@backend/types/types'

import { getAssetRepository } from './graphql/modules/asset/assetRepository'
import { AssetResolver } from './graphql/modules/asset/assetResolver'
import { getChatMessageRepository } from './graphql/modules/chat/chatMessageRepository'
import { getChatRepository } from './graphql/modules/chat/chatRepository'
import { ChatResolver } from './graphql/modules/chat/chatResolver'

const init = async () => {
  const app = express()

  const httpServer = http.createServer(app)

  // Create PubSub instance
  const pubSub = createPubSub()

  const schema = await buildSchema({
    resolvers: [
      EmptyResolver,
      UserResolver,
      BeneficiaryResolver,
      InheritanceProcedureResolver,
      NotaryResolver,
      ContactResolver,
      AssetResolver,
      ChatResolver,
    ],
    pubSub,
    emitSchemaFile: true,
  })

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  })

  wsServer.on('connection', (socket) => {
    console.log('WebSocket connected')

    socket.on('message', (message) => {
      console.log('Received:', message.toString())
    })

    socket.on('close', () => {
      console.log('WebSocket disconnected')
    })

    socket.on('error', (error) => {
      console.error('WebSocket error:', error)
    })
  })

  // useServer is not react hook so disable eslint for next line
  // eslint-disable-next-line
  const wsServerCleanUp = useServer(
    {
      schema,
      context: async () => ({ pubSub }),
    },
    wsServer
  )

  const server = new ApolloServer({
    schema: MOCKS
      ? addMocksToSchema({
          schema,
          resolvers: mockResolvers,
        })
      : schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await wsServerCleanUp.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  const customContext = async ({
    req,
    res,
  }: ExpressContextFunctionArgument): Promise<CustomContext> => {
    const drizzle = await getConnection()
    const authToken = req.headers.authorization ?? ''
    const authUser = parseAndVerifyJWT(authToken)

    res.on('close', () => {
      drizzle?.connection.end()
    })

    return {
      db: drizzle.db,
      authUser,
      notaryRepository: getNotaryRepository(drizzle.db),
      userRepository: getUserRepository(drizzle.db),
      contactRepository: getContactRepository(drizzle.db),
      inheritanceProcedureRepository: getInheritanceProcedureRepository(
        drizzle.db
      ),
      beneficiaryRepository: getBeneficiaryRepository(drizzle.db),
      notaryDateRuleRepository: getNotaryDateRuleRepository(drizzle.db),
      passwordResetTokenRepository: getPasswordResetTokenRepository(drizzle.db),
      emailConfirmationTokenRepository: getEmailConfirmationTokenRepository(
        drizzle.db
      ),
      assetRepository: getAssetRepository(drizzle.db),
      chatRepository: getChatRepository(drizzle.db),
      chatMessageRepository: getChatMessageRepository(drizzle.db),
      pubSub, // Add PubSub to the HTTP context
    }
  }

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(), // accepts all origins ('*'), not support cookies
    express.json(),
    graphqlUploadExpress(),
    expressMiddleware(server, {
      context: customContext,
    })
  )

  app.get('/', (_req, res) => {
    res.redirect('/graphql')
  })

  httpServer.listen({ port: PORT }, () => {
    console.log('Server listening on port: ' + PORT)
  })
}

init()

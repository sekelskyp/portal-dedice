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
import express, { NextFunction, Request, Response } from 'express'
import { graphqlUploadExpress } from 'graphql-upload'
import { useServer } from 'graphql-ws/lib/use/ws'
import * as http from 'http'
import { buildSchema } from 'type-graphql'
import { WebSocketServer } from 'ws'

import { getConnection } from '@backend/db/db'
import { getAddressRepository } from '@backend/graphql/modules/address/addressRepository'
import { AddressResolver } from '@backend/graphql/modules/address/addressResolver'
import { getArticleRepository } from '@backend/graphql/modules/article/articleRepository'
import { ArticleResolver } from '@backend/graphql/modules/article/articleResolver'
import { getAssetRepository } from '@backend/graphql/modules/asset/assetRepository'
import { AssetResolver } from '@backend/graphql/modules/asset/assetResolver'
import { getAttachmentRepository } from '@backend/graphql/modules/attachment/attachmentRepository'
import { AttachmentResolver } from '@backend/graphql/modules/attachment/attachmentResolver'
import { getBeneficiaryRepository } from '@backend/graphql/modules/beneficiary/beneficiaryRepository'
import { BeneficiaryResolver } from '@backend/graphql/modules/beneficiary/beneficiaryResolver'
import { getChatMessageRepository } from '@backend/graphql/modules/chat/chatMessageRepository'
import { getChatRepository } from '@backend/graphql/modules/chat/chatRepository'
import { ChatResolver } from '@backend/graphql/modules/chat/chatResolver'
import { getEmailConfirmationTokenRepository } from '@backend/graphql/modules/emailConfirmationToken/emailConfirmationTokenRepository'
import { EmptyResolver } from '@backend/graphql/modules/empty/emptyResolver'
import { getNotaryRepository } from '@backend/graphql/modules/notary/notaryRepository'
import { NotaryResolver } from '@backend/graphql/modules/notary/notaryResolver'
import { getNotaryDateRuleRepository } from '@backend/graphql/modules/notaryDateRule/notaryDateRuleRepository'
import { NotaryDateRuleResolver } from '@backend/graphql/modules/notaryDateRule/notaryDateRuleResolver'
import { getPasswordResetTokenRepository } from '@backend/graphql/modules/passwordResetToken/passwordResetTokenRepository'
import { getProceedingRepository } from '@backend/graphql/modules/proceeding/proceedingRepository'
import { InheritanceProcedureResolver } from '@backend/graphql/modules/proceeding/proceedingResolver'
import { getUserRepository } from '@backend/graphql/modules/user/userRepository'
import { UserResolver } from '@backend/graphql/modules/user/userResolver'
import { parseAndVerifyJWT } from '@backend/libs/jwt'
import { mockResolvers } from '@backend/mocks/mocks'
import { CustomContext } from '@backend/types/types'

import { AddressSuggestionResolver } from './graphql/modules/addressSuggestions/addressSuggestionResolver'
import { fileRoutes } from './routes/fileRoutes'
import { MOCKS, PORT } from './config'

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
      AssetResolver,
      ChatResolver,
      AddressResolver,
      ArticleResolver,
      AddressSuggestionResolver,
      AttachmentResolver,
      NotaryDateRuleResolver,
    ],
    pubSub,
    emitSchemaFile: true,
  })

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
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
      pubSub, // Add PubSub to the HTTP context
      notaryRepository: getNotaryRepository(drizzle.db),
      userRepository: getUserRepository(drizzle.db),
      proceedingRepository: getProceedingRepository(drizzle.db),
      beneficiaryRepository: getBeneficiaryRepository(drizzle.db),
      notaryDateRuleRepository: getNotaryDateRuleRepository(drizzle.db),
      passwordResetTokenRepository: getPasswordResetTokenRepository(drizzle.db),
      emailConfirmationTokenRepository: getEmailConfirmationTokenRepository(
        drizzle.db
      ),
      assetRepository: getAssetRepository(drizzle.db),
      addressRepository: getAddressRepository(drizzle.db),
      chatRepository: getChatRepository(drizzle.db),
      chatMessageRepository: getChatMessageRepository(drizzle.db),
      articleRepository: getArticleRepository(drizzle.db),
      attachmentRepository: getAttachmentRepository(drizzle.db),
    }
  }
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(), // accepts all origins ('*'), not support cookies
    express.json(),
    graphqlUploadExpress({
      maxFileSize: 25 * 1024 * 1024, // 25MB
      maxFiles: 10, // Optional: Limit the number of files in a single request
    }),
    expressMiddleware(server, {
      context: customContext,
    })
  )

  app.get('/', (_req, res) => {
    res.redirect('/graphql')
  })

  const resolveContext = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const context = await customContext({ req, res })
      res.locals.context = context // Store context in res.locals
      next()
    } catch (error) {
      console.error('Error resolving context:', error)
      res.status(500).send('Internal server error')
    }
  }

  // Add routes for serving files
  app.use(cors<cors.CorsRequest>(), resolveContext, fileRoutes)

  httpServer.listen({ port: PORT }, () => {
    console.log('Server listening on port: ' + PORT)
  })
}

init()

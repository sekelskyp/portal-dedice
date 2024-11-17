import { GraphQLError } from 'graphql'
import { Ctx, Query, Resolver } from 'type-graphql'

import { CustomContext } from '@backend/types/types'
import { formatDate } from '@shared/date'

@Resolver()
export class EmptyResolver {
  @Query(() => String)
  _empty(@Ctx() { authUser }: CustomContext): string {
    if (!authUser) {
      throw new GraphQLError('Unauthorized')
    }
    return `User id ${authUser.userId} Hello, World! ${formatDate(new Date())}`
  }
}

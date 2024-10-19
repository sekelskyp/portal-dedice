import { eq } from 'drizzle-orm'
import { Arg, Ctx, Query, Resolver } from 'type-graphql'

import { user } from '@backend/db/schema'
import { type CustomContext } from '@backend/types/types'

import { User } from './userType'

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(
    @Arg('id') stringId: string,
    @Ctx() { db }: CustomContext
  ): Promise<User | null> {
    const id = parseInt(stringId, 10)
    const userRecord = await db.select().from(user).where(eq(user.id, id))

    if (userRecord.length === 0) {
      return null
    }

    return userRecord[0]
  }

  @Query(() => [User])
  async users(@Ctx() { db }: CustomContext): Promise<User[]> {
    return await db.select().from(user)
  }
}

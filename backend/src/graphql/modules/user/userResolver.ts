import { eq } from 'drizzle-orm'
import { GraphQLError } from 'graphql'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'

import { contact, user } from '@backend/db/schema'
import { type CustomContext } from '@backend/types/types'

import {
  comparePassword,
  hashPassword,
} from '../../../services/passwordHashService'

import { ChangePassword, User, UserProfile } from './userType'

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
  @Mutation(() => UserProfile)
  async updateUserProfile(
    @Arg('name') name: string,
    @Arg('surname') surname: string,
    @Ctx() { db, authUser }: CustomContext
  ) {
    if (!authUser) {
      throw new GraphQLError('Unauthorized')
    }
    const userId = authUser.id
    const userRecord = await db.select().from(user).where(eq(user.id, userId))

    if (userRecord.length === 0) {
      throw new GraphQLError('User not found')
    }

    if (authUser.id !== userRecord[0].id) {
      throw new GraphQLError('Unauthorized access to another user')
    }

    await db
      .update(contact)
      .set({ name, surname })
      .where(eq(contact.id, userRecord[0].contactId))

    const updatedContact = await db
      .select()
      .from(contact)
      .where(eq(contact.id, userRecord[0].contactId))

    const toReturn: UserProfile = {
      id: userId,
      name: updatedContact[0].name,
      surName: updatedContact[0].surname,
    }
    return toReturn
  }
  // for now i am leaving this as is, but we need to synchronize password reser process
  @Mutation(() => ChangePassword)
  async changePassword(
    @Arg('oldPassword') oldPassword: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { db, authUser }: CustomContext
  ) {
    if (!authUser) {
      throw new GraphQLError('Unauthorized')
    }

    const userId = authUser.id
    const userRecord = await db.select().from(user).where(eq(user.id, userId))

    if (userRecord.length === 0) {
      throw new GraphQLError('User not found')
    }

    const passwordsEqual = await comparePassword(
      userRecord[0].password,
      oldPassword
    )
    if (!passwordsEqual) {
      throw new GraphQLError('Old password is incorrect')
    }
    const newPasswordHash = await hashPassword(newPassword)
    await db
      .update(user)
      .set({ password: newPasswordHash })
      .where(eq(user.id, userId))

    const toReturn: ChangePassword = {
      id: userId,
      email: userRecord[0].login,
    }
    return toReturn
  }
}

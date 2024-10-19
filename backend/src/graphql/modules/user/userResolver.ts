import * as argon2 from 'argon2'
import { eq } from 'drizzle-orm'
import { GraphQLError } from 'graphql/error'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'

import { contact, lower, user } from '@backend/db/schema'
import { createToken } from '@backend/libs/jwt'
import { type CustomContext } from '@backend/types/types'

import { AuthInfo, ChangePassword, User, UserProfile } from './userType'

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

  @Mutation(() => AuthInfo)
  async signIn(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { db }: CustomContext
  ): Promise<AuthInfo> {
    const userRecord = await db
      .select()
      .from(user)
      .where(eq(lower(user.login), email.toLocaleLowerCase()))

    if (userRecord.length === 0) {
      throw new GraphQLError('Nesprávný email nebo heslo')
    }

    const foundUser = userRecord[0]
    if (await argon2.verify(foundUser.password, password)) {
      const token = createToken({ id: foundUser.id })

      return {
        user: { ...foundUser },
        token,
      }
    } else {
      throw new GraphQLError('Nesprávný email nebo heslo')
    }
  }

  @Mutation(() => AuthInfo)
  async signUp(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('name') name: string,
    @Arg('surname') surname: string,
    @Arg('gender') gender: string,
    @Ctx() { db }: CustomContext
  ): Promise<AuthInfo> {
    /* VALIDATION */
    const userByEmail = await db
      .select()
      .from(contact)
      .where(eq(contact.email, email))

    if (userByEmail.length > 0) {
      throw new GraphQLError('Email already registered')
    }

    /** PASSWORD HASHING */
    const passwordHash = await argon2.hash(password)

    /** CONTACT INSERT */
    const insertContact = await db
      .insert(contact)
      .values({
        email,
        name,
        surname,
        gender,
      })
      .$returningId()

    const contactId = insertContact[0].id

    /* DATABASE INSERT */
    const insertResult = await db
      .insert(user)
      .values({
        contactId,
        login: email,
        password: passwordHash,
      })
      .$returningId()

    // todo: add row to beneficiary
    // where to take deceasedRelationId ?

    /* ASSEMBLE MUTATION RESPONSE */
    const id = insertResult[0].id

    const token = createToken({ id })

    const userObject = {
      id,
      login: email,
      contactId,
      password,
    }

    return { user: userObject, token: token }
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

    const passwordsEqual = await argon2.verify(
      userRecord[0].password,
      oldPassword
    )
    if (!passwordsEqual) {
      throw new GraphQLError('Old password is incorrect')
    }
    const newPasswordHash = await argon2.hash(newPassword)
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

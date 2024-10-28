import { eq } from 'drizzle-orm'
import { GraphQLError } from 'graphql'
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql'

import { user } from '@backend/db/schema'
import { type CustomContext } from '@backend/types/types'

import {
  comparePassword,
  hashPassword,
} from '../../../services/passwordHashService'
import { Beneficiary } from '../beneficiary/beneficiaryType'
import { Notary } from '../notary/notaryType'

import { ChangePassword, User } from './userType'

@Resolver(() => User)
export class UserResolver {
  // Field resolver for Notary
  @FieldResolver(() => Notary, { nullable: true })
  async notary(
    @Root() user: User,
    @Ctx() { notaryRepository }: CustomContext
  ): Promise<Notary | null> {
    return await notaryRepository.getNotaryByUserId(user.id)
  }

  // Field resolver for Beneficiary
  @FieldResolver(() => Beneficiary, { nullable: true })
  async beneficiary(
    @Root() user: User,
    @Ctx() { beneficiaryRepository }: CustomContext
  ): Promise<Beneficiary | null> {
    return await beneficiaryRepository.getBeneficiaryByUserId(user.id)
  }

  // Fetch a user by ID
  @Query(() => User, { nullable: true })
  async getUserById(
    @Arg('id') id: number,
    @Ctx() { userRepository }: CustomContext
  ): Promise<User | null> {
    return await userRepository.getUserById(id)
  }

  // Fetch all users
  @Query(() => [User])
  async getAllUsers(@Ctx() { userRepository }: CustomContext): Promise<User[]> {
    return await userRepository.getAllUsers()
  }

  // FOR NOW I AM ONLY COMMENTING THIS OUT. PROFILE (CONTACT) WAS MOVED FROM USER TO NOTARY, BENEFICIARY AND OTHERS.
  // TO UPDATE CONTACT IT IS POSSIBLE TO USE CONTACT RESOLVER.

  // @Mutation(() => UserProfile)
  // async updateUserProfile(
  //   @Arg('name') name: string,
  //   @Arg('surname') surname: string,
  //   @Ctx() { db, authUser }: CustomContext
  // ) {
  //   if (!authUser) {
  //     throw new GraphQLError('Unauthorized')
  //   }
  //   const userId = authUser.id
  //   const userRecord = await db.select().from(user).where(eq(user.id, userId))

  //   if (userRecord.length === 0) {
  //     throw new GraphQLError('User not found')
  //   }

  //   if (authUser.id !== userRecord[0].id) {
  //     throw new GraphQLError('Unauthorized access to another user')
  //   }

  //   await db
  //     .update(contact)
  //     .set({ name, surname })
  //     .where(eq(contact.id, userRecord[0].contactId))

  //   const updatedContact = await db
  //     .select()
  //     .from(contact)
  //     .where(eq(contact.id, userRecord[0].contactId))

  //   const toReturn: UserProfile = {
  //     id: userId,
  //     name: updatedContact[0].name,
  //     surName: updatedContact[0].surname,
  //   }
  //   return toReturn
  // }

  // for now i am leaving this as is, but we need to synchronize password reset process
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
      email: userRecord[0].email,
    }
    return toReturn
  }
}

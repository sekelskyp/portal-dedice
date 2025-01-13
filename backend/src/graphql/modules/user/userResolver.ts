import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql'

import { Address } from '@backend/graphql/modules/address/adressType'
import {
  changeUserPassword,
  completePasswordReset,
  confirmEmailVerification,
  getUserById,
  initiatePasswordReset,
  loginUser,
  registerUser,
  updateProfile,
} from '@backend/graphql/modules/user/userService'
import { CustomContext } from '@backend/types/types'
import { UserTypeEnumType } from '@shared/enums'

import { ProfileInput } from './profileInput'
import { RegisterInput } from './registerInput'
import { SignInResponse } from './signInResponseType'
import { User } from './userType'

@Resolver(() => User)
export class UserResolver {
  // QUERIES

  // Fetch a user by ID
  @Query(() => User, { nullable: true })
  async getUserById(
    @Arg('id') id: number,
    @Ctx() context: CustomContext
  ): Promise<User | null> {
    const userRecord = await getUserById(id, context)
    if (!userRecord) {
      return null
    }
    return userRecord
  }

  // Fetch all users by their type
  @Query(() => [User], { nullable: true })
  async getAllUserByType(
    @Arg('type', () => String) type: UserTypeEnumType,
    @Ctx() context: CustomContext
  ): Promise<User[]> {
    return await context.userRepository.getAllUsersByType(type)
  }

  // Fetch all users
  @Query(() => [User])
  async getAllUsers(@Ctx() context: CustomContext): Promise<User[]> {
    return await context.userRepository.getAllUsers()
  }

  // Fetch a user by email
  @Query(() => User, { nullable: true })
  async getUserByEmail(
    @Arg('email') email: string,
    @Ctx() context: CustomContext
  ): Promise<User | null> {
    const userRecord = await context.userRepository.getUserByEmail(email)
    if (!userRecord) {
      return null
    }
    return userRecord
  }

  // MUTATIONS
  // Sign in mutation
  @Mutation(() => SignInResponse)
  async signIn(
    @Arg('login') login: string,
    @Arg('password') password: string,
    @Ctx() context: CustomContext
  ): Promise<SignInResponse> {
    const authResponse = await loginUser(login, password, context)

    const foundUser = await getUserById(authResponse.userId, context)
    if (!foundUser) {
      throw new Error('User not found after login')
    }

    return {
      token: authResponse.token,
      user: foundUser,
    }
  }

  // Sign up mutation
  @Mutation(() => User)
  async signUp(
    @Arg('registerInput') registerInput: RegisterInput,
    @Ctx() context: CustomContext
  ): Promise<User> {
    const userRecordId = await registerUser(registerInput, context)

    if (!userRecordId) {
      throw new Error('Registration failed')
    }

    const foundUser = await getUserById(userRecordId.id, context)
    if (!foundUser) {
      throw new Error('User not found after registration')
    }
    return foundUser
  }

  // Mutation to change user password
  @Mutation(() => Boolean)
  async changePassword(
    @Arg('oldPassword') oldPassword: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() context: CustomContext
  ): Promise<boolean> {
    if (!context.authUser) throw new Error('User is not authenticated')

    await changeUserPassword(
      context.authUser.userId,
      oldPassword,
      newPassword,
      context
    )
    return true
  }

  // Mutation to request password reset
  @Mutation(() => Boolean)
  async requestPasswordReset(
    @Arg('email') email: string,
    @Ctx() context: CustomContext
  ): Promise<boolean> {
    await initiatePasswordReset(email, context)
    return true
  }

  // Mutation to reset password
  @Mutation(() => Boolean)
  async resetPassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() context: CustomContext
  ): Promise<boolean> {
    await completePasswordReset(token, newPassword, context)
    return true
  }

  // Mutation to confirm email
  @Mutation(() => Boolean)
  async confirmEmailVerification(
    @Arg('token') token: string,
    @Ctx() context: CustomContext
  ): Promise<boolean> {
    await confirmEmailVerification(token, context)
    return true
  }

  @Mutation(() => User)
  async updateProfile(
    @Arg('profileInput') profileInput: ProfileInput,
    @Ctx() context: CustomContext
  ): Promise<User> {
    if (!context.authUser) throw new Error('User is not authenticated')

    await updateProfile(context.authUser.userId, profileInput, context)

    const user = await getUserById(context.authUser.userId, context)
    if (!user) throw new Error('User not found after profile update')

    return user
  }

  @Mutation(() => User)
  async updateSendNotifications(
    @Arg('sendNotifications') sendNotifications: boolean,
    @Ctx() context: CustomContext
  ): Promise<User> {
    if (!context.authUser) throw new Error('User is not authenticated')

    await context.userRepository.updateUserById(context.authUser.userId, {
      sendNotifications,
    })

    const user = await getUserById(context.authUser.userId, context)
    if (!user) throw new Error('User not found after profile update')

    return user
  }

  @Mutation(() => User)
  async toggleUserConfirmation(
    @Arg('userId') userId: number,
    @Ctx() context: CustomContext
  ): Promise<User> {
    const user = await context.userRepository.toggleUserConfirmation(userId)
    if (!user) throw new Error('User not found')
    return user
  }

  // FIELD RESOLVERS

  @FieldResolver(() => Address, { nullable: true })
  async address(
    @Root() user: User,
    @Ctx() { addressRepository }: CustomContext
  ): Promise<Address | null> {
    return user.addressId
      ? await addressRepository.getAddressById(user.addressId)
      : null
  }
}

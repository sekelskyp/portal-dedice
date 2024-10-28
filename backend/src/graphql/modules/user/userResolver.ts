import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql'

import {
  changeUserPassword,
  completePasswordReset,
  confirmEmailVerification,
  getUserById,
  initiatePasswordReset,
  loginUser,
  registerUser,
} from '@backend/services/userService'
import { CustomContext } from '@backend/types/types'

import { Beneficiary } from '../beneficiary/beneficiaryType'
import { Notary } from '../notary/notaryType'

import { RegisterInput } from './registerInput'
import { SignInResponse } from './signInResponseType'
import { User } from './userType'

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
    @Ctx() context: CustomContext
  ): Promise<User | null> {
    return await getUserById(id, context) // Call standalone function from userService
  }

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

  @Mutation(() => User)
  async signUp(
    @Arg('registerInput') registerInput: RegisterInput,
    @Ctx() context: CustomContext
  ): Promise<User> {
    const result = await registerUser(
      registerInput.email,
      registerInput.password,
      context
    )

    if (!result) {
      throw new Error('Registration failed')
    }

    const foundUser = await getUserById(result.id, context)
    if (!foundUser) {
      throw new Error('User not found after registration')
    }
    return foundUser
  }

  // Mutation to change user password
  @Mutation(() => User)
  async changePassword(
    @Arg('oldPassword') oldPassword: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() context: CustomContext
  ): Promise<void> {
    if (!context.authUser) {
      throw new Error('User is not authenticated')
    }
    return await changeUserPassword(
      context.authUser.id,
      oldPassword,
      newPassword,
      context
    )
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

  // Mutation to reset password with password reset token
  @Mutation(() => Boolean)
  async resetPassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() context: CustomContext
  ): Promise<boolean> {
    await completePasswordReset(token, newPassword, context)
    return true
  }

  @Mutation(() => Boolean)
  async confirmEmailVerification(
    @Arg('token') token: string,
    @Ctx() context: CustomContext
  ): Promise<boolean> {
    await confirmEmailVerification(token, context)
    return true
  }
}

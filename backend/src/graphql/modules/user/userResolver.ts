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
  getUserById,
  loginUser,
  registerUser,
  requestPasswordReset,
  resetPassword,
} from '@backend/services/userService'
import { CustomContext } from '@backend/types/types'

import { Beneficiary } from '../beneficiary/beneficiaryType'
import { Notary } from '../notary/notaryType'

import { RegisterInput } from './registerInput'
import { SignInResponse } from './signInResponseType'
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

    const foundUser = await context.userRepository.getUserById(
      authResponse.userId
    )
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
    const foundUser = await context.userRepository.getUserById(result.id)
    if (!foundUser) {
      throw new Error('User not found after registration')
    }
    return foundUser
  }

  // Mutation to change user password
  @Mutation(() => ChangePassword)
  async changePassword(
    @Arg('oldPassword') oldPassword: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() context: CustomContext
  ) {
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
    await requestPasswordReset(email, context)
    return true
  }

  // Mutation to reset password with token
  @Mutation(() => Boolean)
  async resetPassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() context: CustomContext
  ): Promise<boolean> {
    await resetPassword(token, newPassword, context)
    return true
  }
}

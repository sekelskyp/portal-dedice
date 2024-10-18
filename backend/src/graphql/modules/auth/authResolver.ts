import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'

import { Contact } from '@backend/graphql/modules/user/contactType'
import { CustomContext } from '@backend/types/types'

import { loginUser, registerUser } from '../../../services/authService'

import { AuthInfo, RegisterInput } from './authType'

@Resolver()
export class AuthResolver {
  @Mutation(() => AuthInfo)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() context: CustomContext
  ): Promise<AuthInfo> {
    // Pass context (db) along with email and password to the service
    const loginResponse = await loginUser(email, password, context)

    // Return the response from the loginUser service
    return {
      token: loginResponse.token,
      user: loginResponse.user,
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() context: CustomContext): Promise<boolean> {
    return await requestLogout(authUser)
  }

  @Mutation(() => AuthInfo)
  async register(
    @Arg('registerInput') registerInput: RegisterInput,
    @Ctx() context: CustomContext
  ): Promise<AuthInfo> {
    return await registerUser(registerInput, context)
  }
}

import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'

import { CustomContext } from '@backend/types/types'

import {
  loginUser,
  registerUser,
  RegisterUserDTO,
} from '../../../services/authService'
import { User } from '../user/userType'

import { RegisterInput, SignInResponse } from './authType'

@Resolver()
export class AuthResolver {
  @Mutation(() => SignInResponse)
  async signIn(
    @Arg('login') login: string,
    @Arg('password') password: string,
    @Ctx() context: CustomContext
  ): Promise<SignInResponse> {
    // Use loginUser service with userRepository for login logic
    const authResponse = await loginUser(login, password, context)

    // Fetch user details using userRepository
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
    const input: RegisterUserDTO = {
      login: registerInput.login,
      password: registerInput.password,
    }

    // Use registerUser service with userRepository for registration logic
    const result = await registerUser(input, context)

    // Fetch user details using userRepository after registration
    if (!result) {
      throw new Error('Registration failed')
    }
    const foundUser = await context.userRepository.getUserById(result.id)
    if (!foundUser) {
      throw new Error('User not found after registration')
    }
    return foundUser
  }
}

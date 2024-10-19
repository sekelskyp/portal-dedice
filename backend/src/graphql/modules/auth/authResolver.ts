import { eq } from 'drizzle-orm'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'

import { user } from '@backend/db/schema'
import { CustomContext } from '@backend/types/types'

import {
  loginUser,
  registerUser,
  RegisterUserDTO,
} from '../../../services/authService'

import { AuthInfo, RegisterInput } from './authType'

@Resolver()
export class AuthResolver {
  @Mutation(() => AuthInfo)
  async signIn(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() context: CustomContext
  ): Promise<AuthInfo> {
    // Pass context (db) along with email and password to the service
    const authResponse = await loginUser(email, password, context)
    const userRecord = await context.db
      .select()
      .from(user)
      .where(eq(user.id, authResponse.userId))

    const foundUser = userRecord[0]
    // Return the response from the loginUser service
    return {
      token: authResponse.token,
      user: foundUser,
    }
  }

  @Mutation(() => AuthInfo)
  async signUp(
    @Arg('registerInput') registerInput: RegisterInput,
    @Ctx() context: CustomContext
  ): Promise<AuthInfo> {
    const input: RegisterUserDTO = {
      login: registerInput.login,
      password: registerInput.password,
      contact: {
        name: registerInput.contact.name,
        surname: registerInput.contact.surname,
        dateOfBirth: registerInput.contact.dateOfBirth,
        gender: registerInput.contact.gender,
        phone: registerInput.contact.phone,
        email: registerInput.contact.email,
        country: registerInput.contact.country,
        city: registerInput.contact.city,
        street: registerInput.contact.street,
        postalCode: registerInput.contact.postalCode,
      },
    }

    const authResponse = await registerUser(input, context)

    // Fetch user details using userId
    const userRecord = await context.db
      .select()
      .from(user)
      .where(eq(user.id, authResponse.userId))

    const foundUser = userRecord[0]
    return {
      user: foundUser,
      token: authResponse.token,
    }
  }
}

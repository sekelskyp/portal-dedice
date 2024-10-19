import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'

import { CustomContext } from '@backend/types/types'

import { requestPasswordReset } from '../../../services/passwordResetService'

@Resolver()
export class PasswordResetResolver {
  @Mutation(() => Boolean)
  async requestPasswordReset(
    @Arg('email') email: string,
    @Ctx() context: CustomContext // Passing the whole context
  ): Promise<boolean> {
    await requestPasswordReset(email, context) // Pass the entire context
    return true // Return true if the request was successful
  }
}

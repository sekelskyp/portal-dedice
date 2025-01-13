import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql'

import { CustomContext } from '@backend/types/types'

import { findAvailableNotary } from '../../../services/notaryAssignmentService'
import { User } from '../user/userType'

import { CreateNotaryInput } from './createNotaryInput'
import { FindNotaryInput } from './findNotaryInput'
import { Notary } from './notaryType'

@Resolver(() => Notary)
export class NotaryResolver {
  // ----------------------------------
  // Queries
  // ----------------------------------

  @Query(() => [Notary])
  async notaries(
    @Ctx() { notaryRepository }: CustomContext
  ): Promise<Notary[]> {
    return notaryRepository.getAllNotaries()
  }

  @Query(() => Notary, { nullable: true })
  async getNotaryById(
    @Arg('id', () => Int) id: number,
    @Ctx() { notaryRepository }: CustomContext
  ): Promise<Notary | null> {
    return notaryRepository.getNotaryById(id)
  }

  @Query(() => Notary, { nullable: true })
  async findNotary(
    @Arg('input') input: FindNotaryInput,
    @Ctx() context: CustomContext
  ): Promise<Notary | null> {
    const findAvailableNotaryInput = {
      addressPostCode: input.addressPostCode,
      dateOfDeath: input.deceasedPersonDateOfDeath,
    }

    const notaryId = await findAvailableNotary(
      findAvailableNotaryInput,
      context
    )
    if (!notaryId) {
      return null
    }
    return context.notaryRepository.getNotaryById(notaryId)
  }

  // ----------------------------------
  // Mutations
  // ----------------------------------

  @Mutation(() => Notary)
  async createNotary(
    @Arg('data') data: CreateNotaryInput,
    @Ctx() { notaryRepository }: CustomContext
  ): Promise<Notary> {
    const notaryId = await notaryRepository.createNotary(data)
    const notary = await notaryRepository.getNotaryById(notaryId)
    if (!notary) {
      throw new Error('Notary not found')
    }
    return notary
  }

  @Mutation(() => Boolean)
  async deleteNotary(
    @Arg('id', () => Int) id: number,
    @Ctx() { notaryRepository }: CustomContext
  ): Promise<boolean> {
    const deletedNotaryId = await notaryRepository.deleteNotaryById(id)
    return deletedNotaryId !== null
  }

  // ----------------------------------
  // Field Resolvers
  // ----------------------------------

  @FieldResolver(() => User, { nullable: true })
  async user(
    @Root() notary: Notary,
    @Ctx() { userRepository }: CustomContext
  ): Promise<User | null> {
    return await userRepository.getUserByNotaryId(notary.id)
  }
}

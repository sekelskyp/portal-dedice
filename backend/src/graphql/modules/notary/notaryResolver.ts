import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql'

import { CustomContext } from '@backend/types/types'

import { findAvailableNotary } from '../../../services/notaryAssignmentService'
import { Contact } from '../contact/contactType'
import { InheritanceProcedure } from '../inheritanceProcedure/inheritanceProcedureType'
import { User } from '../user/userType'

import { CreateNotaryInput } from './createNotaryInput'
import { FindNotaryInput } from './findNotaryInput'
import { Notary } from './notaryType'

@Resolver(() => Notary)
export class NotaryResolver {
  @FieldResolver(() => [InheritanceProcedure])
  async inheritanceProcedures(
    @Root() user: User,
    @Ctx() { inheritanceProcedureRepository }: CustomContext
  ): Promise<InheritanceProcedure[]> {
    const notaries =
      await inheritanceProcedureRepository.getProceduresByNotaryId(user.id)
    return notaries || []
  }

  @Query(() => [Notary])
  async notaries(
    @Ctx() { notaryRepository }: CustomContext
  ): Promise<Notary[]> {
    return notaryRepository.getAllNotaries()
  }

  @Query(() => Notary, { nullable: true })
  async author(
    @Arg('id') id: number,
    @Ctx() { notaryRepository }: CustomContext
  ): Promise<Notary> {
    return notaryRepository.getNotaryById(id)
  }

  @FieldResolver(() => User, { nullable: true })
  async user(
    @Root() notary: Notary,
    @Ctx() { userRepository }: CustomContext
  ): Promise<User | null> {
    return await userRepository.getUserByNotaryId(notary.id)
  }

  @FieldResolver(() => Contact, { nullable: true })
  async contact(
    @Root() notary: Notary,
    @Ctx() { contactRepository }: CustomContext
  ): Promise<Contact | null> {
    return await contactRepository.getContactByNotaryId(notary.id)
  }

  @Mutation(() => Notary)
  async createNotary(
    @Arg('data') data: CreateNotaryInput,
    @Ctx() { notaryRepository }: CustomContext
  ): Promise<Notary> {
    const { id } = await notaryRepository.createNotary(data)
    return notaryRepository.getNotaryById(id)
  }

  @Mutation(() => Notary)
  async deleteNotary(
    @Arg('id') id: number,
    @Ctx() { notaryRepository }: CustomContext
  ): Promise<boolean> {
    const deletedNotaryId = await notaryRepository.deleteNotaryById(id)
    return deletedNotaryId !== null
  }

  @Query(() => Notary, { nullable: true })
  async findNotary(
    @Arg('input') input: FindNotaryInput,
    @Ctx() context: CustomContext
  ): Promise<Notary | null> {
    const findAvailableNotaryInput = {
      postalCode: input.postalCode,
      dateOfDeath: input.deceasedPersonDateOfDeath,
    }

    const [notaryRecord] = await findAvailableNotary(
      findAvailableNotaryInput,
      context
    )
    return notaryRecord
  }
}

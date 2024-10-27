import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'

import { DeceasedPerson } from '@backend/graphql/modules/deceasedPerson/deceasedPersonType'
import { CustomContext } from '@backend/types/types'

import { CreateDeceasedPersonInput } from './createDeceasedPersonInput'
import { UpdateDeceasedPersonInput } from './updateDeceasedPersonInput'

@Resolver(() => DeceasedPerson)
export class DeceasedPersonResolver {
  // Query to fetch all deceased persons
  @Query(() => [DeceasedPerson])
  async getAllDeceasedPersons(
    @Ctx() { deceasedPersonRepository }: CustomContext
  ): Promise<DeceasedPerson[]> {
    return await deceasedPersonRepository.getAllDeceasedPersons()
  }

  // Query to fetch deceased person by ID
  @Query(() => DeceasedPerson, { nullable: true })
  async getDeceasedPersonById(
    @Arg('id') id: number,
    @Ctx() { deceasedPersonRepository }: CustomContext
  ): Promise<DeceasedPerson | null> {
    return await deceasedPersonRepository.getDeceasedPersonById(id)
  }

  // Mutation to create a new deceased person
  @Mutation(() => DeceasedPerson)
  async createDeceasedPerson(
    @Arg('data') data: CreateDeceasedPersonInput,
    @Ctx() { deceasedPersonRepository }: CustomContext
  ): Promise<DeceasedPerson> {
    const id = await deceasedPersonRepository.createDeceasedPerson(data)
    return await deceasedPersonRepository.getDeceasedPersonById(id)
  }

  // Mutation to update a deceased person by ID
  @Mutation(() => DeceasedPerson)
  async updateDeceasedPerson(
    @Arg('id') id: number,
    @Arg('data') data: UpdateDeceasedPersonInput,
    @Ctx() { deceasedPersonRepository }: CustomContext
  ): Promise<DeceasedPerson> {
    await deceasedPersonRepository.updateDeceasedPerson(id, data)
    return await deceasedPersonRepository.getDeceasedPersonById(id)
  }

  // Mutation to delete a deceased person by ID
  @Mutation(() => Boolean)
  async deleteDeceasedPersonById(
    @Arg('id') id: number,
    @Ctx() { deceasedPersonRepository }: CustomContext
  ): Promise<boolean> {
    await deceasedPersonRepository.deleteDeceasedPersonById(id)
    return true
  }
}

import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql'

import { CustomContext } from '@backend/types/types'

import { Contact } from './contactType'
import { CreateContactInput } from './createContactInput'

@Resolver(() => Contact)
export class ContactResolver {
  // Get all contacts
  @Query(() => [Contact])
  async getAllContacts(
    @Ctx() { contactRepository }: CustomContext
  ): Promise<Contact[]> {
    return await contactRepository.getAllContacts()
  }

  // Get a contact by ID
  @Query(() => Contact, { nullable: true })
  async getContactById(
    @Arg('id') id: number,
    @Ctx() { contactRepository }: CustomContext
  ): Promise<Contact | null> {
    return await contactRepository.getContactById(id)
  }

  // Create a new contact
  @Mutation(() => Int)
  async createContact(
    @Arg('data') data: CreateContactInput,
    @Ctx() { contactRepository }: CustomContext
  ): Promise<number> {
    return await contactRepository.createContact(data)
  }

  // Delete a contact by ID
  @Mutation(() => Int)
  async deleteContactById(
    @Arg('id') id: number,
    @Ctx() { contactRepository }: CustomContext
  ): Promise<number> {
    return await contactRepository.deleteContactById(id)
  }
}

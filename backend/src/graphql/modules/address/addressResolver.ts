import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql'

import { CustomContext } from '@backend/types/types'

import { AddressInput } from './addressInput'
import { Address } from './adressType'

@Resolver(() => Address)
export class AddressResolver {
  // Query to get an address by ID
  @Query(() => Address, { nullable: true })
  async getAddressById(
    @Arg('id', () => Int) id: number,
    @Ctx() { addressRepository }: CustomContext
  ): Promise<Address | null> {
    return await addressRepository.getAddressById(id)
  }

  // Mutation to create a new address
  @Mutation(() => Address)
  async createAddress(
    @Arg('data') data: AddressInput,
    @Ctx() { addressRepository }: CustomContext
  ): Promise<Address> {
    const addressId = await addressRepository.createAddress(data)
    const address = await addressRepository.getAddressById(addressId)
    if (!address) {
      throw new Error('Vytvořenou adresu se nepodařilo najít')
    }
    return address
  }

  // Mutation to update an existing address
  @Mutation(() => Address, { nullable: true })
  async updateAddress(
    @Arg('id', () => Int) id: number,
    @Arg('data') data: AddressInput,
    @Ctx() { addressRepository }: CustomContext
  ): Promise<Address> {
    await addressRepository.updateAddressById(id, data)
    const address = await addressRepository.getAddressById(id)
    if (!address) {
      throw new Error('Upravenou adresu se nepodařilo najít')
    }
    return address
  }

  // Mutation to delete an address by ID
  @Mutation(() => Boolean)
  async deleteAddress(
    @Arg('id', () => Int) id: number,
    @Ctx() { addressRepository }: CustomContext
  ): Promise<boolean> {
    const address = await addressRepository.getAddressById(id)
    if (!address) {
      throw new Error('Adresa nebyla nalezena')
    }
    await addressRepository.deleteAddressesByIds([id])
    return true
  }
}

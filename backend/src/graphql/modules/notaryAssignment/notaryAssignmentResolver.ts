import { Arg, Ctx, Query, Resolver } from 'type-graphql'

import { getNotaryByAddressAndBirthDate } from '../../../services/notaryAssignmentService'
import { CustomContext } from '../../../types/types'

import { AddressInput } from './notaryAssignmentType' // Import the AddressInput type

@Resolver()
export class NotaryAssignmentResolver {
  @Query(() => Number, { nullable: true }) // Define that the query returns a Number or null
  async getNotaryByAddressAndBirthDate(
    @Arg('address') address: AddressInput, // Use the AddressInput type here
    @Arg('birthDate') birthDate: Date, // Birth date input argument in string form
    @Ctx() context: CustomContext // The full context object, including database
  ): Promise<number | null> {
    const birthDateObj = new Date(birthDate) // Parse the birth date string into a Date object

    // Call the service method to get the notary by address and birth date
    const notaryId = await getNotaryByAddressAndBirthDate(
      address,
      birthDateObj,
      context
    )

    // Return the notary ID or null if no notary is found
    return notaryId
  }
}

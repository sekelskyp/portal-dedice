import { Arg, Ctx, Query, Resolver } from 'type-graphql'

import { getNotaryByAddressAndBirthDate } from '../../../services/notaryAssignmentService'
import { CustomContext } from '../../../types/types'

import { AddressInput, Notary } from './notaryAssignmentType'

@Resolver()
export class NotaryAssignmentResolver {
  @Query(() => Number, { nullable: true })
  async getNotaryByAddressAndBirthDate(
    @Arg('address') address: AddressInput,
    @Arg('expirationDate') expirationDate: Date,
    @Ctx() context: CustomContext
  ): Promise<Notary | null> {
    const birthDateObj = new Date(expirationDate)

    // Call the service method to get the notary by address and birth date
    const notary = await getNotaryByAddressAndBirthDate(
      address,
      birthDateObj,
      context
    )

    return notary
  }
}

import { eq } from 'drizzle-orm'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'

import { notaryDate } from '@backend/db/schema' // Assuming 'notary_date' is your table schema
import { CustomContext } from '@backend/types/types' // Assuming you have CustomContext

import { NotaryDate } from './notaryDateType'

@Resolver(() => NotaryDate)
export class NotaryDateResolver {
  // Query to fetch notary dates by notary ID
  @Query(() => [NotaryDate], { nullable: true })
  async getNotaryDatesByNotaryId(
    @Arg('notaryId') notaryId: number,
    @Ctx() { db }: CustomContext
  ): Promise<NotaryDate[] | null> {
    const notaryDateRecords = await db
      .select()
      .from(notaryDate)
      .where(eq(notaryDate.notaryId, notaryId))
    return notaryDateRecords.length ? notaryDateRecords : null
  }

  // Query to fetch a specific notary date by ID
  @Query(() => NotaryDate, { nullable: true })
  async getNotaryDateById(
    @Arg('id') id: number,
    @Ctx() { db }: CustomContext
  ): Promise<NotaryDate | null> {
    const notaryDateRecord = await db
      .select()
      .from(notaryDate)
      .where(eq(notaryDate.id, id))
    return notaryDateRecord[0] || null // Return the first result or null if none exists
  }

  @Mutation(() => NotaryDate)
  async createNotaryDate(
    @Arg('notaryId') notaryId: number,
    @Arg('dateResponsible') dateResponsible: Date,
    @Ctx() { db }: CustomContext
  ): Promise<NotaryDate> {
    // Insert and return the first inserted ID from the array
    const newIdArray = await db
      .insert(notaryDate)
      .values({ notaryId, dateResponsible })
      .$returningId()

    const newId = newIdArray[0].id // Extract the first (or only) inserted ID

    // Fetch the newly created record by the returned ID
    const notaryDateRecord = await db
      .select()
      .from(notaryDate)
      .where(eq(notaryDate.id, newId))

    return notaryDateRecord[0] || null // Return the full object
  }

  // Mutation to delete a notary date by ID
  @Mutation(() => Boolean)
  async deleteNotaryDate(
    @Arg('id') id: number,
    @Ctx() { db }: CustomContext
  ): Promise<void> {
    await db.delete(notaryDate).where(eq(notaryDate.id, id))
  }
}

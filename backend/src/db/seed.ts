// import { not, sql } from 'drizzle-orm'

import { getConnection } from './db'
import { beneficiary, contact, notary, user } from './schema'

async function seed() {
  const { db, connection } = await getConnection()

  try {

    await db.delete(contact);
    await db.delete(user);
    await db.delete(beneficiary);
    await db.delete(notary);


    




    // Use INSERT IGNORE to insert task states, ignoring duplicates
    // await db.execute(
    //   sql`INSERT IGNORE INTO TaskState (state) VALUES 
    //   ('Open'), ('InProgress'), ('Completed'), ('Closed')`
    // )

    // // Use INSERT IGNORE to insert procedure states, ignoring duplicates
    // await db.execute(
    //   sql`INSERT IGNORE INTO ProcedureState (state) VALUES 
    //   ('Initiated'), ('Pending'), ('Resolved'), ('Closed')`
    // )

    // // Use INSERT IGNORE to insert beneficiary deceased relation, ignoring duplicates
    // await db.execute(
    //   sql`INSERT IGNORE INTO ProcedureState (state) VALUES 
    //     ('Spouse'), ('Child'), ('Parent'), ('Other')`
    // )

    console.log('Database seeded successfully.')
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    await connection.end() // Ensure the connection is closed after seeding
    process.exit(0)
  }
}

// Execute the seed function
seed()

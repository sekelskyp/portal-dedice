import { SQL, sql } from 'drizzle-orm'
import {
  AnyMySqlColumn,
  boolean,
  char,
  check,
  date,
  datetime,
  float,
  int,
  mysqlTable,
  primaryKey,
  text,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core'

import {
  assetTypeEnum,
  genderEnum,
  proceedingStateEnum,
  userTypeEnum,
} from '@shared/enums'

// Define User Table
export const user = mysqlTable(
  'user',
  {
    id: int('id').primaryKey().autoincrement(),
    email: varchar('email', { length: 100 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    confirmed: boolean('confirmed').default(false).notNull(),
    type: varchar('type', {
      length: 6,
      enum: userTypeEnum,
    })
      .notNull()
      .default('User'),
    notaryId: int('notary_id').references(() => notary.id),
    sendNotifications: boolean('send_notifications').default(true).notNull(),
    name: varchar('name', { length: 125 }).notNull(),
    surname: varchar('surname', { length: 125 }).notNull(),
    displayName: varchar('display_name', { length: 255 }).notNull(),
    gender: varchar('gender', {
      length: 7,
      enum: genderEnum,
    }),
    phone: char('phone', { length: 15 }),
    addressId: int('address_id').references(() => address.id),
  },
  (table) => ({
    loginUniqueIndex: uniqueIndex('user_email_unique_index').on(
      lower(table.email)
    ),
  })
)

// Define Address Table
export const address = mysqlTable('address', {
  id: int('id').primaryKey().autoincrement(),
  street: varchar('street', { length: 100 }).notNull(),
  streetNumber: varchar('street_number', {
    length: 20,
  }).notNull(),
  municipality: varchar('municipality', {
    length: 100,
  }).notNull(),
  postalCode: varchar('postal_code', { length: 10 }).notNull(),
})

// Define Notary Table
export const notary = mysqlTable('notary', {
  id: int('id').primaryKey().autoincrement(),
  // area for which is notary assigned (right now matching uses postal code to assign notary)
  postalCode: varchar('postal_code', { length: 10 }),
})

// Define Beneficiary Table (create new beneficiary for each new proceeding)
export const beneficiary = mysqlTable('beneficiary', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id')
    .references(() => user.id, { onDelete: 'cascade' })
    .notNull(),
  proceedingId: int('proceeding_id').references(() => proceeding.id, {
    onDelete: 'cascade',
  }),
})

// Define InheritanceProcedure Table
export const proceeding = mysqlTable('proceeding', {
  id: int('id').primaryKey().autoincrement(),
  notaryId: int('notary_id').references(() => notary.id),
  name: varchar('name', { length: 100 }).notNull(),
  state: varchar('state', {
    length: 10,
    enum: proceedingStateEnum,
  })
    .default('InProgress')
    .notNull(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date'),
  mainBeneficiaryId: int('main_beneficiary_id').references(
    (): AnyMySqlColumn => beneficiary.id,
    { onDelete: 'set null' }
  ),
  // deceased person info
  deceasedName: varchar('deceased_name', { length: 125 }).notNull(),
  deceasedSurname: varchar('surname', { length: 125 }).notNull(),
  deceasedDisplayName: varchar('display_name', { length: 255 }).notNull(),
  deceasedAddressId: int('address_id').references(() => address.id, {
    onDelete: 'set null',
  }),
  deceasedDateOfBirth: date('date_of_birth').notNull(),
  deceasedDateOfDeath: date('date_of_death').notNull(),
})

// Define Meeting Table
export const meeting = mysqlTable('meeting', {
  id: int('id').primaryKey().autoincrement(),
  notaryId: int('notary_id')
    .references(() => notary.id)
    .notNull(), // FK to Notary
  scheduledDateTime: date('scheduled_date_time').notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  notes: text('notes'),
})

// Define Asset Table
export const asset = mysqlTable('asset', {
  id: int('id').primaryKey().autoincrement(),
  proceedingId: int('proceeding_id')
    .references(() => proceeding.id, { onDelete: 'cascade' })
    .notNull(), // FK to InheritanceProcedure
  value: float('value').notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  type: varchar('type', {
    length: 20,
    enum: assetTypeEnum,
  }).notNull(),
  bankName: varchar('bank_name', { length: 100 }),
  carMakeName: varchar('car_make_name', { length: 100 }),
  carRegistrationDate: date('car_registration_date'),
  carType: varchar('car_type', { length: 20 }),
  cin: varchar('cin', { length: 8 }),
})

// Define Chat Table
export const chat = mysqlTable('chat', {
  id: int('id').primaryKey().autoincrement(),
  proceedingId: int('proceeding_id')
    .references(() => proceeding.id, { onDelete: 'cascade' })
    .notNull(), // FK to InheritanceProcedure
})

// Define ChatMessage Table
export const chatMessage = mysqlTable('chat_message', {
  id: int('id').primaryKey().autoincrement(),
  chatId: int('chat_id')
    .references(() => chat.id, { onDelete: 'cascade' })
    .notNull(), // FK to Chat
  userId: int('user_id')
    .references(() => user.id, { onDelete: 'cascade' })
    .notNull(), // FK to User
  body: text('body').notNull(),
  createdAt: datetime('created_at').notNull().default(new Date()),
})

// Define BeneficiaryMeetingRel Table for M2M between Beneficiary and Meeting with Composite Key
export const beneficiaryMeetingRel = mysqlTable(
  'beneficiary_meeting_rel',
  {
    beneficiaryId: int('beneficiary_id')
      .references(() => beneficiary.id, { onDelete: 'cascade' })
      .notNull(), // FK to Beneficiary
    meetingId: int('meeting_id')
      .references(() => meeting.id, { onDelete: 'cascade' })
      .notNull(), // FK to Meeting
  },
  (table) => ({
    compositePk: primaryKey({
      columns: [table.beneficiaryId, table.meetingId], // Composite Primary Key
    }),
  })
)

// Define Password Reset Token Table
export const passwordResetToken = mysqlTable('password_reset_token', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id')
    .references(() => user.id)
    .notNull(), // FK to User
  token: varchar('token', { length: 255 }).notNull(),
  expiresAt: datetime('expires_at').notNull(),
})

// Define Email confirmation Token Table
export const emailConfirmationToken = mysqlTable('email_confirmation_token', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id')
    .references(() => user.id)
    .notNull(), // FK to User
  token: varchar('token', { length: 255 }).notNull(),
  expiresAt: datetime('expires_at').notNull(),
})

// Define Notary Date Rule Table with Separate Day and Month Checks
export const notaryDateRule = mysqlTable(
  'notary_date_rule',
  {
    id: int('id').primaryKey().autoincrement(),
    notaryId: int('notary_id')
      .references(() => notary.id, { onDelete: 'cascade' })
      .notNull(), // Foreign Key to Notary
    startDay: int('start_day').notNull(),
    endDay: int('end_day').notNull(),
    startMonth: int('start_month').notNull(),
    endMonth: int('end_month').notNull(),
  },
  (table) => ({
    // Check that the day is between 1 and 31
    checkStartDay: check(
      'check_start_day',
      sql`${table.startDay} BETWEEN 1 AND 31`
    ),
    checkEndDay: check('check_end_day', sql`${table.endDay} BETWEEN 1 AND 31`),
    // Check that the month is between 1 and 12
    checkStartMonth: check(
      'check_start_month',
      sql`${table.startMonth} BETWEEN 1 AND 12`
    ),
    checkEndMonth: check(
      'check_end_month',
      sql`${table.endMonth} BETWEEN 1 AND 12`
    ),
    // Separate check: Ensure the end day is greater than or equal to the start day
    checkDayRange: check(
      'check_day_range',
      sql`${table.endDay} >= ${table.startDay}`
    ),
    // Separate check: Ensure the end month is greater than or equal to the start month
    checkMonthRange: check(
      'check_month_range',
      sql`${table.endMonth} >= ${table.startMonth}`
    ),
  })
)

export const article = mysqlTable('article', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(), // Article title
  date: date('date').default(new Date()).notNull(),
  content: text('content').notNull(), // Article content (stored as text)
  coverImageAttachmentId: int('attachment_id').references(() => attachment.id, {
    onDelete: 'set null',
  }),
})

// Define Attachment Table (that represents a stored file)
export const attachment = mysqlTable('attachment', {
  id: int('id').primaryKey().autoincrement(),
  proceedingId: int('proceeding_id').references(() => proceeding.id),
  uploadDate: datetime('upload_date')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  // stored file informartion
  fileUuid: varchar('file_uuid', { length: 36 }).notNull(),
  filepath: varchar('filepath', { length: 255 }).notNull(),
  filename: varchar('filename', { length: 255 }).notNull(),
  mimetype: varchar('mimetype', { length: 100 }).notNull(),
})

// Custom lower function
// https://orm.drizzle.team/docs/guides/unique-case-insensitive-email
export function lower(email: AnyMySqlColumn): SQL<unknown> {
  return sql`(lower(${email}))`
}

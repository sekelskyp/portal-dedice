import { SQL, sql } from 'drizzle-orm'
import {
  AnyMySqlColumn,
  boolean,
  char,
  check,
  date,
  datetime,
  float,
  foreignKey,
  int,
  longtext,
  mysqlTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core'

const taskTypeEnum = ['Upload Document', 'Set Up Meeting', 'Custom'] as const
export type TaskTypeEnumType = (typeof taskTypeEnum)[number]

const genderEnum = ['Male', 'Female', 'Other'] as const
export type GenderEnumType = (typeof genderEnum)[number]

const taskStateEnum = ['Open', 'InProgress', 'Completed', 'Closed'] as const
export type TaskStateEnumType = (typeof taskStateEnum)[number]

const inheritanceProcedureStateEnum = ['InProgress', 'Closed'] as const
export type InheritanceProcedureStateEnumType =
  (typeof inheritanceProcedureStateEnum)[number]

const deceasedRelationEnum = ['Spouse', 'Child', 'Parent', 'Other'] as const
export type DeceasedRelationEnumType = (typeof deceasedRelationEnum)[number]

// Define User Table
export const user = mysqlTable(
  'user',
  {
    id: int('id').primaryKey().autoincrement(),
    email: varchar('email', { length: 100 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    confirmed: boolean('confirmed').default(false).notNull(),
  },
  (table) => ({
    loginUniqueIndex: uniqueIndex('user_email_unique_index').on(
      lower(table.email)
    ),
  })
)

// Define Contact Table
export const contact = mysqlTable('contact', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 125 }).notNull(),
  surname: varchar('surname', { length: 125 }).notNull(),
  displayName: varchar('display_name', { length: 255 }).notNull(),
  gender: varchar('gender', {
    length: 7,
    enum: genderEnum,
  }),
  phone: char('phone', { length: 15 }),
  email: varchar('email', { length: 255 }),
  completeAddress: varchar('complete_address', { length: 255 }),
  postalCode: varchar('postal_code', { length: 8 }),
})

// Define Notary Table
export const notary = mysqlTable('notary', {
  id: int('id').primaryKey().autoincrement(),
  contactId: int('contact_id').references(() => contact.id),
  userId: int('user_id').references(() => user.id),
})

// Define Beneficiary Table
export const beneficiary = mysqlTable('beneficiary', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id').references(() => user.id),
  deceasedRelation: varchar('deceased_relation', {
    length: 6,
    enum: deceasedRelationEnum,
  }),
  contactId: int('contact_id').references(() => contact.id),
  dateOfBirth: date('date_of_birth'),
})

// Define InheritanceProcedure Table
export const inheritanceProcedure = mysqlTable('inheritance_procedure', {
  id: int('id').primaryKey().autoincrement(),
  notaryId: int('notary_id').references(() => notary.id),
  name: varchar('name', { length: 100 }).notNull(),
  state: varchar('state', {
    length: 10,
    enum: inheritanceProcedureStateEnum,
  })
    .default('InProgress')
    .notNull(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date'),
  // main Contact
  mainContactId: int('main_contact_id').references(() => contact.id),
  // deceased person info
  deceasedContactId: int('deceased_contact_id').references(() => contact.id),
  deceasedDateOfBirth: date('date_of_birth'),
  deceasedDateOfDeath: date('date_of_death'),
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
  inheritanceProcedureId: int('inheritance_procedure_id')
    .references(() => inheritanceProcedure.id)
    .notNull(), // FK to InheritanceProcedure
  value: float('value').notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
})

// Define Document Table
export const document = mysqlTable('document', {
  id: int('id').primaryKey().autoincrement(),
  inheritanceProcedureId: int('inheritance_procedure_id')
    .references(() => inheritanceProcedure.id)
    .notNull(), // FK to InheritanceProcedure
  taskId: int('task_id').references(() => task.id), // FK to Task
  userOwnerId: int('user_owner_id').references(() => user.id), // FK to User
  createDate: timestamp('create_date').defaultNow().notNull(),
  fileName: varchar('file_name', { length: 255 }).notNull(),
  fileType: varchar('file_type', { length: 100 }).notNull(),
  fileData: longtext('file_data').notNull(),
})

// Define Chat Table
export const chat = mysqlTable('chat', {
  id: int('id').primaryKey().autoincrement(),
  inheritanceProcedureId: int('inheritance_procedure_id')
    .references(() => inheritanceProcedure.id)
    .notNull(), // FK to InheritanceProcedure
})

// Define ChatMessage Table
export const chatMessage = mysqlTable('chat_message', {
  id: int('id').primaryKey().autoincrement(),
  chatId: int('chat_id')
    .references(() => chat.id)
    .notNull(), // FK to Chat
  userId: int('user_id')
    .references(() => user.id)
    .notNull(), // FK to User
  body: text('body').notNull(),
})

// Define Task Table
export const task = mysqlTable('task', {
  id: int('id').primaryKey().autoincrement(),
  type: varchar('type', {
    length: 15,
    enum: taskTypeEnum,
  }).notNull(),
  deadline: date('deadline'),
  state: varchar('state', {
    length: 10,
    enum: taskStateEnum,
  }),
  label: varchar('label', { length: 100 }).notNull(),
  description: text('description'),
  inheritanceProcedureId: int('inheritance_procedure_id')
    .references(() => inheritanceProcedure.id)
    .notNull(), // FK to InheritanceProcedure
})

// Define BeneficiaryMeetingRel Table for M2M between Beneficiary and Meeting with Composite Key
export const beneficiaryMeetingRel = mysqlTable(
  'beneficiary_meeting_rel',
  {
    beneficiaryId: int('beneficiary_id')
      .references(() => beneficiary.id)
      .notNull(), // FK to Beneficiary
    meetingId: int('meeting_id')
      .references(() => meeting.id)
      .notNull(), // FK to Meeting
  },
  (table) => ({
    compositePk: primaryKey({
      columns: [table.beneficiaryId, table.meetingId], // Composite Primary Key
    }),
  })
)

// Define BeneficiaryInheritanceProcedureRel Table for M2M between Beneficiary and InheritanceProcedure with Composite Key
export const beneficiaryInheritanceProcedureRel = mysqlTable(
  'beneficiary_inheritance_procedure_rel',
  {
    beneficiaryId: int('beneficiary_id').notNull(),
    inheritanceProcedureId: int('inheritance_procedure_id').notNull(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.beneficiaryId, table.inheritanceProcedureId],
      name: 'ben_inher_proc_pk', // Shorter custom name for PK
    }),
    beneficiaryFk: foreignKey({
      columns: [table.beneficiaryId],
      foreignColumns: [beneficiary.id],
      name: 'ben_inher_proc_ben_id_fk', // Custom short name for FK
    }),
    inheritanceProcedureFk: foreignKey({
      columns: [table.inheritanceProcedureId],
      foreignColumns: [inheritanceProcedure.id],
      name: 'ben_inher_proc_inher_id_fk', // Custom short name for FK
    }),
  })
)

// Define BeneficiaryTaskRel Table for M2M between Beneficiary and Task with Composite Key
export const beneficiaryTaskRel = mysqlTable(
  'beneficiary_task_rel',
  {
    beneficiaryId: int('beneficiary_id')
      .references(() => beneficiary.id)
      .notNull(), // FK to Beneficiary
    taskId: int('task_id')
      .references(() => task.id)
      .notNull(), // FK to Task
  },
  (table) => ({
    compositePk: primaryKey({
      columns: [table.beneficiaryId, table.taskId], // Composite Primary Key
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
      .references(() => notary.id)
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

// Custom lower function
// https://orm.drizzle.team/docs/guides/unique-case-insensitive-email
export function lower(email: AnyMySqlColumn): SQL {
  return sql`(lower(${email}))`
}

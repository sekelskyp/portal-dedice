import { SQL, sql } from 'drizzle-orm'
import {
  AnyMySqlColumn,
  binary,
  char,
  date,
  datetime,
  float,
  int,
  mysqlTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core'

// Define User Table
export const user = mysqlTable(
  'user',
  {
    id: int('id').primaryKey().autoincrement(),
    contactId: int('contact_id').notNull(),
    login: varchar('login', { length: 255 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),
  },
  (table) => ({
    loginUniqueIndex: uniqueIndex('user_login_unique_index').on(
      lower(table.login)
    ),
  })
)

// Define Contact Table
export const contact = mysqlTable(
  'contact',
  {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }).notNull(),
    surname: varchar('surname', { length: 255 }).notNull(),
    dateOfBirth: date('date_of_birth').notNull(),
    gender: varchar('gender', { length: 50 }).notNull(),
    phone: char('phone', { length: 15 }),
    email: varchar('email', { length: 255 }).notNull(),
    country: varchar('country', { length: 100 }).notNull(),
    city: varchar('city', { length: 100 }).notNull(),
    street: varchar('street', { length: 255 }).notNull(),
    postalCode: varchar('postal_code', { length: 8 }).notNull(),
  },
  (table) => ({
    emailUniqueIndex: uniqueIndex('contact_email_unique_index').on(
      lower(table.email)
    ),
  })
)

// Define Notary Table
export const notary = mysqlTable('notary', {
  id: int('id').primaryKey().autoincrement(),
  businessContactId: int('business_contact_id').notNull(),
  userId: int('user_id').notNull(),
})

// Define TaskState Table
export const taskState = mysqlTable('task_state', {
  id: int('id').primaryKey().autoincrement(),
  state: varchar('state', { length: 50 }).notNull().unique(),
})

// Define ProcedureState Table
export const procedureState = mysqlTable('procedure_state', {
  id: int('id').primaryKey().autoincrement(),
  state: varchar('state', { length: 50 }).notNull().unique(),
})

// Define InheritanceProcedure Table with Foreign Key to ProcedureState
export const inheritanceProcedure = mysqlTable('inheritance_procedure', {
  id: int('id').primaryKey().autoincrement(),
  notaryId: int('notary_id').notNull(),
  stateId: int('state_id').notNull(), // FK to ProcedureState
})

// Define Beneficiary Table
export const beneficiary = mysqlTable('beneficiary', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id').notNull(),
  deceasedRelationId: int('deceased_relation_id').notNull(),
})

// Define BeneficiaryDeceasedRelation Table
export const beneficiaryDeceasedRelation = mysqlTable(
  'beneficiary_deceased_relation',
  {
    id: int('id').primaryKey().autoincrement(),
    familyRelation: varchar('family_relation', { length: 50 })
      .notNull()
      .unique(),
  }
)

// Define Meeting Table
export const meeting = mysqlTable('meeting', {
  id: int('id').primaryKey().autoincrement(),
  notaryId: int('notary_id').notNull(),
  scheduledDateTime: date('scheduled_date_time').notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  notes: text('notes'),
})

// Define Asset Table
export const asset = mysqlTable('asset', {
  id: int('id').primaryKey().autoincrement(),
  inheritanceProcedureId: int('inheritance_procedure_id').notNull(),
  value: float('value').notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
})

// Define Document Table
export const document = mysqlTable('document', {
  id: int('id').primaryKey().autoincrement(),
  inheritanceProcedureId: int('inheritance_procedure_id').notNull(),
  taskId: int('task_id'),
  userOwnerId: int('user_owner_id'),
  createDate: timestamp('create_date').defaultNow(),
  fileName: varchar('file_name', { length: 255 }).notNull(),
  fileType: varchar('file_type', { length: 100 }).notNull(),
  fileData: binary('file_data'),
})

// Define Chat Table
export const chat = mysqlTable('chat', {
  id: int('id').primaryKey().autoincrement(),
  inheritanceProcedureId: int('inheritance_procedure_id').notNull(),
})

// Define ChatMessage Table
export const chatMessage = mysqlTable('chat_message', {
  id: int('id').primaryKey().autoincrement(),
  chatId: int('chat_id').notNull(),
  userId: int('user_id').notNull(),
  body: text('body').notNull(),
})

// Define Task Table with Foreign Key to TaskState
export const task = mysqlTable('task', {
  id: int('id').primaryKey().autoincrement(),
  typeId: int('type_id').notNull(),
  deadline: date('deadline'),
  stateId: int('state_id').notNull(), // FK to TaskState
  label: varchar('label', { length: 100 }).notNull(),
  description: text('description'),
  inheritanceProcedureId: int('inheritance_procedure_id').notNull(),
})

// Define TaskType Table
export const taskType = mysqlTable('task_type', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'),
})

// Define FAQ Table
export const faq = mysqlTable('faq', {
  id: int('id').primaryKey().autoincrement(),
  question: varchar('question', { length: 100 }).notNull(),
  answer: varchar('answer', { length: 255 }).notNull(),
  createDate: timestamp('create_date').defaultNow(),
  notaryOwnerId: int('notary_owner_id'),
  taskTypeId: int('task_type_id'),
})

// Define BeneficiaryMeetingRel Table for M2M between Beneficiary and Meeting with Composite Key
export const beneficiaryMeetingRel = mysqlTable(
  'beneficiary_meeting_rel',
  {
    beneficiaryId: int('beneficiary_id').notNull(),
    meetingId: int('meeting_id').notNull(),
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
    compositePk: primaryKey({
      columns: [table.beneficiaryId, table.inheritanceProcedureId], // Composite Primary Key
    }),
  })
)

// Define BeneficiaryTaskRel Table for M2M between Beneficiary and Task with Composite Key
export const beneficiaryTaskRel = mysqlTable(
  'beneficiary_task_rel',
  {
    beneficiaryId: int('beneficiary_id').notNull(),
    taskId: int('task_id').notNull(),
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
  userId: int('user_id').notNull(), // References the user requesting the reset
  token: varchar('token', { length: 255 }).notNull(), // Secure token for reset link
  expiresAt: datetime('expires_at').notNull(), // Expiration time for the token
})

// Custom lower function
// https://orm.drizzle.team/docs/guides/unique-case-insensitive-email
export function lower(email: AnyMySqlColumn): SQL {
  return sql`(lower(${email}))`
}

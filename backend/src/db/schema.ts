import { table } from 'console'
import { SQL, sql } from 'drizzle-orm'
import {
  AnyMySqlColumn,
  binary,
  char,
  date,
  float,
  foreignKey,
  int,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core'

// Define User Table
export const user = mysqlTable(
  'User',
  {
    id: int('id').primaryKey().autoincrement(),
    contactId: int('contactId')
      .references(() => contact.id)
      .notNull(),
    login: varchar('login', { length: 255 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),
  },
  (table) => ({
    loginUniqueIndex: uniqueIndex('loginUniqueIndex').on(lower(table.login)),
  })
)

// Define Contact Table
export const contact = mysqlTable(
  'Contact',
  {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }).notNull(),
    surname: varchar('surname', { length: 255 }).notNull(),
    dateOfBirth: date('dateOfBirth'),
    gender: varchar('gender', { length: 50 }).notNull(),
    phone: char('phone', { length: 15 }),
    email: varchar('email', { length: 255 }).notNull(),
  },
  (table) => ({
    emailUniqueIndex: uniqueIndex('emailUniqueIndex').on(lower(table.email)),
  })
)

// Define Notary Table
export const notary = mysqlTable('Notary', {
  id: int('id').primaryKey().autoincrement(),
  businessContactId: int('businessContactId')
    .references(() => contact.id)
    .notNull(),
  userId: int('userId')
    .references(() => user.id)
    .notNull(),
})

// Define TaskState Table
export const taskState = mysqlTable('TaskState', {
  id: int('id').primaryKey().autoincrement(),
  state: varchar('state', { length: 50 }).notNull().unique(),
})

// Define ProcedureState Table
export const procedureState = mysqlTable('ProcedureState', {
  id: int('id').primaryKey().autoincrement(),
  state: varchar('state', { length: 50 }).notNull().unique(),
})

// Define InheritanceProcedure Table with Foreign Key to ProcedureState
export const inheritanceProcedure = mysqlTable('InheritanceProcedure', {
  id: int('id').primaryKey().autoincrement(),
  notaryId: int('notaryId')
    .references(() => notary.id)
    .notNull(),
  stateId: int('stateId').references(() => procedureState.id), // FK to ProcedureState
})

// Define Beneficiary Table
export const beneficiary = mysqlTable('Beneficiary', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('userId')
    .references(() => user.id)
    .notNull(),
  deceasedRelationId: int('deceasedRelationId')
    .references(() => beneficiaryDeceasedRelation.id)
    .notNull(),
})

// Define BeneficiaryDeceasedRelation Table (only define once)
export const beneficiaryDeceasedRelation = mysqlTable(
  'BeneficiaryDeceasedRelation',
  {
    id: int('id').primaryKey().autoincrement(),
    familyRelation: varchar('familyRelation', { length: 50 })
      .notNull()
      .unique(),
  }
)

// Define Meeting Table
export const meeting = mysqlTable('Meeting', {
  id: int('id').primaryKey().autoincrement(),
  notaryId: int('notaryId').notNull(),
  scheduledDateTime: date('scheduledDateTime').notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  notes: text('notes'),
})

// Define Asset Table
export const asset = mysqlTable('Asset', {
  id: int('id').primaryKey().autoincrement(),
  inheritanceProcedureId: int('inheritanceProcedureId')
    .references(() => inheritanceProcedure.id)
    .notNull(),
  value: float('value').notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
})

// Define Document Table
export const document = mysqlTable('Document', {
  id: int('id').primaryKey().autoincrement(),
  inheritanceProcedureId: int('inheritanceProcedureId')
    .references(() => inheritanceProcedure.id)
    .notNull(),
  taskId: int('taskId').references(() => task.id),
  userOwnerId: int('userOwnerId'),
  createDate: timestamp('createDate').defaultNow(),
  fileName: varchar('fileName', { length: 255 }).notNull(),
  fileType: varchar('fileType', { length: 100 }).notNull(),
  fileData: binary('fileData'),
})

// Define Chat Table
export const chat = mysqlTable('Chat', {
  id: int('id').primaryKey().autoincrement(),
  inheritanceProcedureId: int('inheritanceProcedureId')
    .references(() => inheritanceProcedure.id)
    .notNull(),
})

// Define ChatMessage Table
export const chatMessage = mysqlTable('ChatMessage', {
  id: int('id').primaryKey().autoincrement(),
  chatId: int('chatId')
    .references(() => chat.id)
    .notNull(),
  userId: int('userId')
    .references(() => user.id)
    .notNull(),
  body: text('body').notNull(),
})

// Define TaskType Table
export const taskType = mysqlTable('TaskType', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'),
})

// Define Task Table with Foreign Key to TaskState
export const task = mysqlTable('Task', {
  id: int('id').primaryKey().autoincrement(),
  typeId: int('typeId')
    .references(() => taskType.id)
    .notNull(),
  deadline: date('deadline'),
  stateId: int('stateId')
    .references(() => taskState.id)
    .notNull(), // FK to TaskState
  label: varchar('label', { length: 100 }).notNull(),
  description: text('description'),
  inheritanceProcedureId: int('inheritanceProcedureId')
    .references(() => inheritanceProcedure.id)
    .notNull(),
})

// Define FAQ Table
export const faq = mysqlTable('FAQ', {
  id: int('id').primaryKey().autoincrement(),
  question: varchar('question', { length: 100 }).notNull(),
  answer: varchar('answer', { length: 255 }).notNull(),
  createDate: timestamp('createDate').defaultNow(),
  notaryOwnerId: int('notaryOwnerId').references(() => notary.id),
  taskTypeId: int('taskTypeId').references(() => taskType.id),
})

// Define BeneficiaryMeetingRel Table for M2M between Beneficiary and Meeting
export const beneficiaryMeetingRel = mysqlTable('BeneficiaryMeetingRel', {
  beneficiaryId: int('beneficiaryId')
    .references(() => beneficiary.id)
    .notNull(),
  meetingId: int('meetingId')
    .references(() => meeting.id)
    .notNull(),
})

// Define BeneficiaryInheritanceProcedureRel Table for M2M between Beneficiary and InheritanceProcedure
export const beneficiaryInheritanceProcedureRel = mysqlTable(
  'BeneficiaryInheritanceProcedureRel',
  {
    beneficiaryId: int('beneficiaryId').notNull(),
    inheritanceProcedureId: int('inheritanceProcedureId').notNull(),
  },
  (table) => ({
    cfk: [
      foreignKey({
        name: 'BIPRel_inhPId_InheritanceProcedure_id_fk',
        columns: [table.inheritanceProcedureId],
        foreignColumns: [inheritanceProcedure.id],
      }),
      foreignKey({
        name: 'BIPRel_benId_Beneficiary_id_fk',
        columns: [table.beneficiaryId],
        foreignColumns: [beneficiary.id],
      }),
    ],
  })
)

// Define BeneficiaryTaskRel Table for M2M between Beneficiary and Task
export const beneficiaryTaskRel = mysqlTable('BeneficiaryTaskRel', {
  beneficiaryId: int('beneficiaryId')
    .references(() => beneficiary.id)
    .notNull(),
  taskId: int('taskId')
    .references(() => task.id)
    .notNull(),
})

// Custom lower function
// https://orm.drizzle.team/docs/guides/unique-case-insensitive-email
export function lower(email: AnyMySqlColumn): SQL {
  return sql`(lower(${email}))`
}

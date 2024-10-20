CREATE TABLE `Asset` (
	`id` int AUTO_INCREMENT NOT NULL,
	`inheritanceProcedureId` int NOT NULL,
	`value` float NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	CONSTRAINT `Asset_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Beneficiary` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`deceasedRelationId` int NOT NULL,
	CONSTRAINT `Beneficiary_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `BeneficiaryDeceasedRelation` (
	`id` int AUTO_INCREMENT NOT NULL,
	`familyRelation` varchar(50) NOT NULL,
	CONSTRAINT `BeneficiaryDeceasedRelation_id` PRIMARY KEY(`id`),
	CONSTRAINT `BeneficiaryDeceasedRelation_familyRelation_unique` UNIQUE(`familyRelation`)
);
--> statement-breakpoint
CREATE TABLE `BeneficiaryInheritanceProcedureRel` (
	`beneficiaryId` int NOT NULL,
	`inheritanceProcedureId` int NOT NULL
);
--> statement-breakpoint
CREATE TABLE `BeneficiaryMeetingRel` (
	`beneficiaryId` int NOT NULL,
	`meetingId` int NOT NULL
);
--> statement-breakpoint
CREATE TABLE `BeneficiaryTaskRel` (
	`beneficiaryId` int NOT NULL,
	`taskId` int NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Chat` (
	`id` int AUTO_INCREMENT NOT NULL,
	`inheritanceProcedureId` int NOT NULL,
	CONSTRAINT `Chat_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ChatMessage` (
	`id` int AUTO_INCREMENT NOT NULL,
	`chatId` int NOT NULL,
	`userId` int NOT NULL,
	`body` text NOT NULL,
	CONSTRAINT `ChatMessage_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Contact` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`surname` varchar(255) NOT NULL,
	`dateOfBirth` date,
	`gender` varchar(50) NOT NULL,
	`phone` char(15),
	`email` char(100),
	CONSTRAINT `Contact_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Document` (
	`id` int AUTO_INCREMENT NOT NULL,
	`inheritanceProcedureId` int NOT NULL,
	`taskId` int,
	`userOwnerId` int,
	`createDate` timestamp DEFAULT (now()),
	`fileName` varchar(255) NOT NULL,
	`fileType` varchar(100) NOT NULL,
	`fileData` binary,
	CONSTRAINT `Document_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `FAQ` (
	`id` int AUTO_INCREMENT NOT NULL,
	`question` varchar(100) NOT NULL,
	`answer` varchar(255) NOT NULL,
	`createDate` timestamp DEFAULT (now()),
	`notaryOwnerId` int,
	`taskTypeId` int,
	CONSTRAINT `FAQ_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `InheritanceProcedure` (
	`id` int AUTO_INCREMENT NOT NULL,
	`notaryId` int NOT NULL,
	`stateId` int NOT NULL,
	CONSTRAINT `InheritanceProcedure_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Meeting` (
	`id` int AUTO_INCREMENT NOT NULL,
	`notaryId` int NOT NULL,
	`scheduledDateTime` date NOT NULL,
	`name` varchar(100) NOT NULL,
	`notes` text,
	CONSTRAINT `Meeting_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Notary` (
	`id` int AUTO_INCREMENT NOT NULL,
	`businessContactId` int NOT NULL,
	`userId` int NOT NULL,
	CONSTRAINT `Notary_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ProcedureState` (
	`id` int AUTO_INCREMENT NOT NULL,
	`state` varchar(50) NOT NULL,
	CONSTRAINT `ProcedureState_id` PRIMARY KEY(`id`),
	CONSTRAINT `ProcedureState_state_unique` UNIQUE(`state`)
);
--> statement-breakpoint
CREATE TABLE `Task` (
	`id` int AUTO_INCREMENT NOT NULL,
	`typeId` int NOT NULL,
	`deadline` date,
	`stateId` int NOT NULL,
	`label` varchar(100) NOT NULL,
	`description` text,
	`inheritanceProcedureId` int NOT NULL,
	CONSTRAINT `Task_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `TaskState` (
	`id` int AUTO_INCREMENT NOT NULL,
	`state` varchar(50) NOT NULL,
	CONSTRAINT `TaskState_id` PRIMARY KEY(`id`),
	CONSTRAINT `TaskState_state_unique` UNIQUE(`state`)
);
--> statement-breakpoint
CREATE TABLE `TaskType` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	CONSTRAINT `TaskType_id` PRIMARY KEY(`id`),
	CONSTRAINT `TaskType_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `User` (
	`id` int AUTO_INCREMENT NOT NULL,
	`contactId` int NOT NULL,
	`login` varchar(100) NOT NULL,
	`password` varchar(255) NOT NULL,
	CONSTRAINT `User_id` PRIMARY KEY(`id`)
);

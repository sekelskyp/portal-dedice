CREATE TABLE `asset` (
	`id` int AUTO_INCREMENT NOT NULL,
	`inheritance_procedure_id` int NOT NULL,
	`value` float NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`type` varchar(20) NOT NULL,
	`bank_name` varchar(100),
	`car_make_name` varchar(100),
	`car_registration_date` date,
	`car_type` varchar(20),
	`cin` varchar(8),
	CONSTRAINT `asset_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `beneficiary` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`deceased_relation` varchar(6),
	`contact_id` int,
	`date_of_birth` date,
	`send_notifications` boolean NOT NULL DEFAULT true,
	CONSTRAINT `beneficiary_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `beneficiary_inheritance_procedure_rel` (
	`beneficiary_id` int NOT NULL,
	`inheritance_procedure_id` int NOT NULL,
	CONSTRAINT `ben_inher_proc_pk` PRIMARY KEY(`beneficiary_id`,`inheritance_procedure_id`)
);
--> statement-breakpoint
CREATE TABLE `beneficiary_meeting_rel` (
	`beneficiary_id` int NOT NULL,
	`meeting_id` int NOT NULL,
	CONSTRAINT `beneficiary_meeting_rel_beneficiary_id_meeting_id_pk` PRIMARY KEY(`beneficiary_id`,`meeting_id`)
);
--> statement-breakpoint
CREATE TABLE `beneficiary_task_rel` (
	`beneficiary_id` int NOT NULL,
	`task_id` int NOT NULL,
	CONSTRAINT `beneficiary_task_rel_beneficiary_id_task_id_pk` PRIMARY KEY(`beneficiary_id`,`task_id`)
);
--> statement-breakpoint
CREATE TABLE `chat` (
	`id` int AUTO_INCREMENT NOT NULL,
	`inheritance_procedure_id` int NOT NULL,
	CONSTRAINT `chat_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `chat_message` (
	`id` int AUTO_INCREMENT NOT NULL,
	`chat_id` int NOT NULL,
	`user_id` int NOT NULL,
	`body` text NOT NULL,
	`created_at` datetime NOT NULL DEFAULT '2024-11-17 22:59:27.704',
	CONSTRAINT `chat_message_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contact` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(125) NOT NULL,
	`surname` varchar(125) NOT NULL,
	`display_name` varchar(255) NOT NULL,
	`gender` varchar(7),
	`phone` char(15),
	`email` varchar(255),
	`address_street` varchar(100),
	`address_street_number` varchar(20),
	`address_municipality` varchar(100),
	`address_post_code` varchar(10),
	CONSTRAINT `contact_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `document` (
	`id` int AUTO_INCREMENT NOT NULL,
	`inheritance_procedure_id` int NOT NULL,
	`task_id` int,
	`user_owner_id` int,
	`create_date` timestamp NOT NULL DEFAULT (now()),
	`file_name` varchar(255) NOT NULL,
	`file_type` varchar(100) NOT NULL,
	`file_data` longtext NOT NULL,
	CONSTRAINT `document_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `email_confirmation_token` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `email_confirmation_token_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `inheritance_procedure` (
	`id` int AUTO_INCREMENT NOT NULL,
	`notary_id` int,
	`name` varchar(100) NOT NULL,
	`state` varchar(10) NOT NULL DEFAULT 'InProgress',
	`start_date` date NOT NULL,
	`end_date` date,
	`main_contact_id` int,
	`deceased_contact_id` int,
	`date_of_birth` date,
	`date_of_death` date,
	CONSTRAINT `inheritance_procedure_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `meeting` (
	`id` int AUTO_INCREMENT NOT NULL,
	`notary_id` int NOT NULL,
	`scheduled_date_time` date NOT NULL,
	`name` varchar(100) NOT NULL,
	`notes` text,
	CONSTRAINT `meeting_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notary` (
	`id` int AUTO_INCREMENT NOT NULL,
	`contact_id` int,
	`user_id` int,
	CONSTRAINT `notary_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notary_date_rule` (
	`id` int AUTO_INCREMENT NOT NULL,
	`notary_id` int NOT NULL,
	`start_day` int NOT NULL,
	`end_day` int NOT NULL,
	`start_month` int NOT NULL,
	`end_month` int NOT NULL,
	CONSTRAINT `notary_date_rule_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `password_reset_token` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `password_reset_token_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `task` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type` varchar(15) NOT NULL,
	`deadline` date,
	`state` varchar(10),
	`label` varchar(100) NOT NULL,
	`description` text,
	`inheritance_procedure_id` int NOT NULL,
	CONSTRAINT `task_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(100) NOT NULL,
	`password` varchar(255) NOT NULL,
	`confirmed` boolean NOT NULL DEFAULT false,
	`contact_id` int,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique_index` UNIQUE((lower(`email`)))
);
--> statement-breakpoint
ALTER TABLE `asset` ADD CONSTRAINT `asset_inheritance_procedure_id_inheritance_procedure_id_fk` FOREIGN KEY (`inheritance_procedure_id`) REFERENCES `inheritance_procedure`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `beneficiary` ADD CONSTRAINT `beneficiary_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `beneficiary` ADD CONSTRAINT `beneficiary_contact_id_contact_id_fk` FOREIGN KEY (`contact_id`) REFERENCES `contact`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `beneficiary_inheritance_procedure_rel` ADD CONSTRAINT `ben_inher_proc_ben_id_fk` FOREIGN KEY (`beneficiary_id`) REFERENCES `beneficiary`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `beneficiary_inheritance_procedure_rel` ADD CONSTRAINT `ben_inher_proc_inher_id_fk` FOREIGN KEY (`inheritance_procedure_id`) REFERENCES `inheritance_procedure`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `beneficiary_meeting_rel` ADD CONSTRAINT `beneficiary_meeting_rel_beneficiary_id_beneficiary_id_fk` FOREIGN KEY (`beneficiary_id`) REFERENCES `beneficiary`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `beneficiary_meeting_rel` ADD CONSTRAINT `beneficiary_meeting_rel_meeting_id_meeting_id_fk` FOREIGN KEY (`meeting_id`) REFERENCES `meeting`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `beneficiary_task_rel` ADD CONSTRAINT `beneficiary_task_rel_beneficiary_id_beneficiary_id_fk` FOREIGN KEY (`beneficiary_id`) REFERENCES `beneficiary`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `beneficiary_task_rel` ADD CONSTRAINT `beneficiary_task_rel_task_id_task_id_fk` FOREIGN KEY (`task_id`) REFERENCES `task`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `chat` ADD CONSTRAINT `chat_inheritance_procedure_id_inheritance_procedure_id_fk` FOREIGN KEY (`inheritance_procedure_id`) REFERENCES `inheritance_procedure`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `chat_message` ADD CONSTRAINT `chat_message_chat_id_chat_id_fk` FOREIGN KEY (`chat_id`) REFERENCES `chat`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `chat_message` ADD CONSTRAINT `chat_message_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `document` ADD CONSTRAINT `document_inheritance_procedure_id_inheritance_procedure_id_fk` FOREIGN KEY (`inheritance_procedure_id`) REFERENCES `inheritance_procedure`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `document` ADD CONSTRAINT `document_task_id_task_id_fk` FOREIGN KEY (`task_id`) REFERENCES `task`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `document` ADD CONSTRAINT `document_user_owner_id_user_id_fk` FOREIGN KEY (`user_owner_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `email_confirmation_token` ADD CONSTRAINT `email_confirmation_token_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `inheritance_procedure` ADD CONSTRAINT `inheritance_procedure_notary_id_notary_id_fk` FOREIGN KEY (`notary_id`) REFERENCES `notary`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `inheritance_procedure` ADD CONSTRAINT `inheritance_procedure_main_contact_id_contact_id_fk` FOREIGN KEY (`main_contact_id`) REFERENCES `contact`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `inheritance_procedure` ADD CONSTRAINT `inheritance_procedure_deceased_contact_id_contact_id_fk` FOREIGN KEY (`deceased_contact_id`) REFERENCES `contact`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `meeting` ADD CONSTRAINT `meeting_notary_id_notary_id_fk` FOREIGN KEY (`notary_id`) REFERENCES `notary`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notary` ADD CONSTRAINT `notary_contact_id_contact_id_fk` FOREIGN KEY (`contact_id`) REFERENCES `contact`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notary` ADD CONSTRAINT `notary_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notary_date_rule` ADD CONSTRAINT `notary_date_rule_notary_id_notary_id_fk` FOREIGN KEY (`notary_id`) REFERENCES `notary`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `password_reset_token` ADD CONSTRAINT `password_reset_token_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `task` ADD CONSTRAINT `task_inheritance_procedure_id_inheritance_procedure_id_fk` FOREIGN KEY (`inheritance_procedure_id`) REFERENCES `inheritance_procedure`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user` ADD CONSTRAINT `user_contact_id_contact_id_fk` FOREIGN KEY (`contact_id`) REFERENCES `contact`(`id`) ON DELETE no action ON UPDATE no action;
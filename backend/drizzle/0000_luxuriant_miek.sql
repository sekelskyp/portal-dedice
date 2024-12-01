CREATE TABLE `address` (
	`id` int AUTO_INCREMENT NOT NULL,
	`street` varchar(100) NOT NULL,
	`street_number` varchar(20) NOT NULL,
	`municipality` varchar(100) NOT NULL,
	`postal_code` varchar(10) NOT NULL,
	CONSTRAINT `address_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `asset` (
	`id` int AUTO_INCREMENT NOT NULL,
	`proceeding_id` int NOT NULL,
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
	`user_id` int NOT NULL,
	`proceeding_id` int,
	CONSTRAINT `beneficiary_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `beneficiary_meeting_rel` (
	`beneficiary_id` int NOT NULL,
	`meeting_id` int NOT NULL,
	CONSTRAINT `beneficiary_meeting_rel_beneficiary_id_meeting_id_pk` PRIMARY KEY(`beneficiary_id`,`meeting_id`)
);
--> statement-breakpoint
CREATE TABLE `chat` (
	`id` int AUTO_INCREMENT NOT NULL,
	`proceeding_id` int NOT NULL,
	CONSTRAINT `chat_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `chat_message` (
	`id` int AUTO_INCREMENT NOT NULL,
	`chat_id` int NOT NULL,
	`user_id` int NOT NULL,
	`body` text NOT NULL,
	`created_at` datetime NOT NULL DEFAULT '2024-11-24 13:58:10.440',
	CONSTRAINT `chat_message_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `document` (
	`id` int AUTO_INCREMENT NOT NULL,
	`proceeding_id` int NOT NULL,
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
	`postal_code` varchar(10),
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
CREATE TABLE `proceeding` (
	`id` int AUTO_INCREMENT NOT NULL,
	`notary_id` int,
	`name` varchar(100) NOT NULL,
	`state` varchar(10) NOT NULL DEFAULT 'InProgress',
	`start_date` date NOT NULL,
	`end_date` date,
	`main_beneficiary_id` int,
	`deceased_name` varchar(125) NOT NULL,
	`surname` varchar(125) NOT NULL,
	`display_name` varchar(255) NOT NULL,
	`address_id` int NOT NULL,
	`date_of_birth` date NOT NULL,
	`date_of_death` date NOT NULL,
	CONSTRAINT `proceeding_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(100) NOT NULL,
	`password` varchar(255) NOT NULL,
	`confirmed` boolean NOT NULL DEFAULT false,
	`type` varchar(6) NOT NULL DEFAULT 'User',
	`notary_id` int,
	`send_notifications` boolean NOT NULL DEFAULT true,
	`name` varchar(125) NOT NULL,
	`surname` varchar(125) NOT NULL,
	`display_name` varchar(255) NOT NULL,
	`gender` varchar(7),
	`phone` char(15),
	`address_id` int,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique_index` UNIQUE((lower(`email`)))
);
--> statement-breakpoint
ALTER TABLE `asset` ADD CONSTRAINT `asset_proceeding_id_proceeding_id_fk` FOREIGN KEY (`proceeding_id`) REFERENCES `proceeding`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `beneficiary` ADD CONSTRAINT `beneficiary_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `beneficiary` ADD CONSTRAINT `beneficiary_proceeding_id_proceeding_id_fk` FOREIGN KEY (`proceeding_id`) REFERENCES `proceeding`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `beneficiary_meeting_rel` ADD CONSTRAINT `beneficiary_meeting_rel_beneficiary_id_beneficiary_id_fk` FOREIGN KEY (`beneficiary_id`) REFERENCES `beneficiary`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `beneficiary_meeting_rel` ADD CONSTRAINT `beneficiary_meeting_rel_meeting_id_meeting_id_fk` FOREIGN KEY (`meeting_id`) REFERENCES `meeting`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `chat` ADD CONSTRAINT `chat_proceeding_id_proceeding_id_fk` FOREIGN KEY (`proceeding_id`) REFERENCES `proceeding`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `chat_message` ADD CONSTRAINT `chat_message_chat_id_chat_id_fk` FOREIGN KEY (`chat_id`) REFERENCES `chat`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `chat_message` ADD CONSTRAINT `chat_message_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `document` ADD CONSTRAINT `document_proceeding_id_proceeding_id_fk` FOREIGN KEY (`proceeding_id`) REFERENCES `proceeding`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `email_confirmation_token` ADD CONSTRAINT `email_confirmation_token_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `meeting` ADD CONSTRAINT `meeting_notary_id_notary_id_fk` FOREIGN KEY (`notary_id`) REFERENCES `notary`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notary_date_rule` ADD CONSTRAINT `notary_date_rule_notary_id_notary_id_fk` FOREIGN KEY (`notary_id`) REFERENCES `notary`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `password_reset_token` ADD CONSTRAINT `password_reset_token_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `proceeding` ADD CONSTRAINT `proceeding_notary_id_notary_id_fk` FOREIGN KEY (`notary_id`) REFERENCES `notary`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `proceeding` ADD CONSTRAINT `proceeding_main_beneficiary_id_beneficiary_id_fk` FOREIGN KEY (`main_beneficiary_id`) REFERENCES `beneficiary`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `proceeding` ADD CONSTRAINT `proceeding_address_id_address_id_fk` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user` ADD CONSTRAINT `user_notary_id_notary_id_fk` FOREIGN KEY (`notary_id`) REFERENCES `notary`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user` ADD CONSTRAINT `user_address_id_address_id_fk` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON DELETE no action ON UPDATE no action;
CREATE TABLE `attachment` (
	`id` int AUTO_INCREMENT NOT NULL,
	`proceeding_id` int,
	`upload_date` date NOT NULL DEFAULT '2025-01-01',
	`file_uuid` varchar(255) NOT NULL,
	`filepath` varchar(255) NOT NULL,
	`filename` varchar(255) NOT NULL,
	`mimetype` varchar(30) NOT NULL,
	CONSTRAINT `attachment_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `article` MODIFY COLUMN `date` date NOT NULL DEFAULT '2025-01-01';--> statement-breakpoint
ALTER TABLE `chat_message` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2025-01-01 22:40:13.034';--> statement-breakpoint
ALTER TABLE `attachment` ADD CONSTRAINT `attachment_proceeding_id_proceeding_id_fk` FOREIGN KEY (`proceeding_id`) REFERENCES `proceeding`(`id`) ON DELETE no action ON UPDATE no action;
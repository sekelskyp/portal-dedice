ALTER TABLE `article` MODIFY COLUMN `date` date NOT NULL DEFAULT '2025-01-03';--> statement-breakpoint
ALTER TABLE `chat_message` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2025-01-03 23:39:56.228';--> statement-breakpoint
ALTER TABLE `article` ADD `attachment_id` int;--> statement-breakpoint
ALTER TABLE `article` ADD CONSTRAINT `article_attachment_id_attachment_id_fk` FOREIGN KEY (`attachment_id`) REFERENCES `attachment`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `article` DROP COLUMN `file_name`;--> statement-breakpoint
ALTER TABLE `article` DROP COLUMN `file_type`;--> statement-breakpoint
ALTER TABLE `article` DROP COLUMN `file_data`;
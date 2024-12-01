ALTER TABLE `chat_message` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2024-12-01 19:07:55.150';--> statement-breakpoint
ALTER TABLE `article` ADD `file_name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `article` ADD `file_type` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `article` ADD `file_data` longtext NOT NULL;
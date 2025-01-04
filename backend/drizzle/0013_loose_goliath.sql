DROP TABLE `document`;--> statement-breakpoint
ALTER TABLE `article` MODIFY COLUMN `date` date NOT NULL DEFAULT '2025-01-04';--> statement-breakpoint
ALTER TABLE `chat_message` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2025-01-04 17:57:32.445';
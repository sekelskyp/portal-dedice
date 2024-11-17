ALTER TABLE `chat_message` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2024-11-17 15:18:11.824';--> statement-breakpoint
ALTER TABLE `asset` ADD `bankName` varchar(100);--> statement-breakpoint
ALTER TABLE `asset` ADD `carMakeName` varchar(100);
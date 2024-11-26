ALTER TABLE `proceeding` DROP FOREIGN KEY `proceeding_address_id_address_id_fk`;
--> statement-breakpoint
ALTER TABLE `chat_message` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2024-11-26 19:34:46.329';--> statement-breakpoint
ALTER TABLE `proceeding` ADD CONSTRAINT `proceeding_address_id_address_id_fk` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON DELETE set null ON UPDATE no action;
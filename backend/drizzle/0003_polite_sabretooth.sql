ALTER TABLE `chat_message` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2024-11-17 12:37:34.938';--> statement-breakpoint
ALTER TABLE `user` ADD `contact_id` int;--> statement-breakpoint
ALTER TABLE `user` ADD CONSTRAINT `user_contact_id_contact_id_fk` FOREIGN KEY (`contact_id`) REFERENCES `contact`(`id`) ON DELETE no action ON UPDATE no action;
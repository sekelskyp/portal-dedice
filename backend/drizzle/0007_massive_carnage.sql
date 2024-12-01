ALTER TABLE `chat_message` DROP FOREIGN KEY `chat_message_chat_id_chat_id_fk`;
--> statement-breakpoint
ALTER TABLE `chat_message` DROP FOREIGN KEY `chat_message_user_id_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `article` MODIFY COLUMN `date` date NOT NULL DEFAULT '2024-12-01';--> statement-breakpoint
ALTER TABLE `chat_message` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2024-12-01 15:19:05.679';--> statement-breakpoint
ALTER TABLE `chat_message` ADD CONSTRAINT `chat_message_chat_id_chat_id_fk` FOREIGN KEY (`chat_id`) REFERENCES `chat`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `chat_message` ADD CONSTRAINT `chat_message_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;
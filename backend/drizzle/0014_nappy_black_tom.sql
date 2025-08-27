ALTER TABLE `notary_date_rule` DROP FOREIGN KEY `notary_date_rule_notary_id_notary_id_fk`;
--> statement-breakpoint
ALTER TABLE `article` MODIFY COLUMN `date` date NOT NULL DEFAULT '2025-08-27';--> statement-breakpoint
ALTER TABLE `chat_message` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2025-08-27 16:37:36.359';--> statement-breakpoint
ALTER TABLE `notary_date_rule` ADD CONSTRAINT `notary_date_rule_notary_id_notary_id_fk` FOREIGN KEY (`notary_id`) REFERENCES `notary`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `proceeding` DROP FOREIGN KEY `proceeding_notary_id_notary_id_fk`;
--> statement-breakpoint
ALTER TABLE `proceeding` DROP FOREIGN KEY `proceeding_main_beneficiary_id_beneficiary_id_fk`;
--> statement-breakpoint
ALTER TABLE `proceeding` DROP FOREIGN KEY `proceeding_address_id_address_id_fk`;
--> statement-breakpoint
ALTER TABLE `chat_message` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2024-11-26 19:12:23.351';--> statement-breakpoint
ALTER TABLE `proceeding` MODIFY COLUMN `address_id` int;--> statement-breakpoint
ALTER TABLE `proceeding` ADD CONSTRAINT `proceeding_notary_id_notary_id_fk` FOREIGN KEY (`notary_id`) REFERENCES `notary`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `proceeding` ADD CONSTRAINT `proceeding_main_beneficiary_id_beneficiary_id_fk` FOREIGN KEY (`main_beneficiary_id`) REFERENCES `beneficiary`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `proceeding` ADD CONSTRAINT `proceeding_address_id_address_id_fk` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON DELETE set null ON UPDATE no action;
ALTER TABLE `contact` RENAME COLUMN `complete_address` TO `address_street`;--> statement-breakpoint
ALTER TABLE `contact` RENAME COLUMN `postal_code` TO `address_post_code`;--> statement-breakpoint
ALTER TABLE `chat_message` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2024-11-17 12:58:35.908';--> statement-breakpoint
ALTER TABLE `contact` MODIFY COLUMN `address_street` varchar(100);--> statement-breakpoint
ALTER TABLE `contact` MODIFY COLUMN `address_post_code` varchar(10);--> statement-breakpoint
ALTER TABLE `contact` ADD `address_municipality` varchar(100);--> statement-breakpoint
ALTER TABLE `contact` ADD `address_street_number` varchar(20);
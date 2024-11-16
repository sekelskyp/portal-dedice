ALTER TABLE `document` MODIFY COLUMN `create_date` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `document` MODIFY COLUMN `file_data` text NOT NULL;
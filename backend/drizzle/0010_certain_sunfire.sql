ALTER TABLE `article` MODIFY COLUMN `date` date NOT NULL DEFAULT '2025-01-02';--> statement-breakpoint
ALTER TABLE `attachment` MODIFY COLUMN `upload_date` date NOT NULL DEFAULT '2025-01-02';--> statement-breakpoint
ALTER TABLE `attachment` MODIFY COLUMN `file_uuid` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `attachment` MODIFY COLUMN `mimetype` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `chat_message` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2025-01-02 14:19:36.785';
CREATE TABLE `article` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`date` date NOT NULL DEFAULT '2024-11-30',
	`content` text NOT NULL,
	CONSTRAINT `article_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `chat_message` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2024-11-30 16:14:01.121';
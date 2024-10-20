ALTER TABLE `Contact` MODIFY COLUMN `email` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `User` MODIFY COLUMN `login` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `Contact` ADD CONSTRAINT `emailUniqueIndex` UNIQUE(`(lower(`email`))`);--> statement-breakpoint
ALTER TABLE `User` ADD CONSTRAINT `loginUniqueIndex` UNIQUE(`(lower(`login`))`);
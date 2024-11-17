ALTER TABLE `chat` DROP FOREIGN KEY `chat_inheritance_procedure_id_inheritance_procedure_id_fk`;
--> statement-breakpoint
ALTER TABLE `task` DROP FOREIGN KEY `task_inheritance_procedure_id_inheritance_procedure_id_fk`;
--> statement-breakpoint
ALTER TABLE `chat_message` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2024-11-17 22:54:33.051';--> statement-breakpoint
ALTER TABLE `chat` ADD CONSTRAINT `chat_inheritance_procedure_id_inheritance_procedure_id_fk` FOREIGN KEY (`inheritance_procedure_id`) REFERENCES `inheritance_procedure`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `task` ADD CONSTRAINT `task_inheritance_procedure_id_inheritance_procedure_id_fk` FOREIGN KEY (`inheritance_procedure_id`) REFERENCES `inheritance_procedure`(`id`) ON DELETE cascade ON UPDATE no action;
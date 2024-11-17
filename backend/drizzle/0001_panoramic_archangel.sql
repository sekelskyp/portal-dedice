ALTER TABLE `beneficiary_inheritance_procedure_rel` DROP FOREIGN KEY `ben_inher_proc_ben_id_fk`;
--> statement-breakpoint
ALTER TABLE `beneficiary_inheritance_procedure_rel` DROP FOREIGN KEY `ben_inher_proc_inher_id_fk`;
--> statement-breakpoint
ALTER TABLE `chat_message` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2024-11-17 22:52:13.307';--> statement-breakpoint
ALTER TABLE `beneficiary_inheritance_procedure_rel` ADD CONSTRAINT `ben_inher_proc_ben_id_fk` FOREIGN KEY (`beneficiary_id`) REFERENCES `beneficiary`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `beneficiary_inheritance_procedure_rel` ADD CONSTRAINT `ben_inher_proc_inher_id_fk` FOREIGN KEY (`inheritance_procedure_id`) REFERENCES `inheritance_procedure`(`id`) ON DELETE cascade ON UPDATE no action;
-- AlterTable
ALTER TABLE `grouptransaction` ADD COLUMN `role` ENUM('MEMBER', 'ADMIN') NOT NULL DEFAULT 'MEMBER';

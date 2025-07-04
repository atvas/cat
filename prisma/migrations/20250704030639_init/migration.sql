/*
  Warnings:

  - You are about to drop the column `role` on the `grouptransaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `groupmember` ADD COLUMN `role` ENUM('MEMBER', 'ADMIN') NOT NULL DEFAULT 'MEMBER';

-- AlterTable
ALTER TABLE `grouptransaction` DROP COLUMN `role`;

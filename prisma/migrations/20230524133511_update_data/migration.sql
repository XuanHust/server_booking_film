/*
  Warnings:

  - Added the required column `banner` to the `Tours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poster` to the `Tours` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tours` ADD COLUMN `banner` VARCHAR(191) NOT NULL,
    ADD COLUMN `poster` VARCHAR(191) NOT NULL;

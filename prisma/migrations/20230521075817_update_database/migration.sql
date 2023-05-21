/*
  Warnings:

  - Added the required column `cateId` to the `Tours` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tours` ADD COLUMN `cateId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tours` ADD CONSTRAINT `Categories_key` FOREIGN KEY (`cateId`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

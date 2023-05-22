/*
  Warnings:

  - Added the required column `cinemaId` to the `Movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `movies` ADD COLUMN `cinemaId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Movies` ADD CONSTRAINT `cinema_key` FOREIGN KEY (`cinemaId`) REFERENCES `Cinemas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

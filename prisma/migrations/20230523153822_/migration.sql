-- DropForeignKey
ALTER TABLE `movies` DROP FOREIGN KEY `cinema_key`;

-- AlterTable
ALTER TABLE `movies` MODIFY `cinemaId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Movies` ADD CONSTRAINT `cinema_key` FOREIGN KEY (`cinemaId`) REFERENCES `Cinemas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

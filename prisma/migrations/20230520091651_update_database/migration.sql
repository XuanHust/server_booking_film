/*
  Warnings:

  - You are about to drop the column `bookingId` on the `movies` table. All the data in the column will be lost.
  - Added the required column `movieId` to the `Bookings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `movies` DROP FOREIGN KEY `Bookings_movies_key`;

-- AlterTable
ALTER TABLE `bookings` ADD COLUMN `movieId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `movies` DROP COLUMN `bookingId`;

-- AddForeignKey
ALTER TABLE `Bookings` ADD CONSTRAINT `Bookings_movies_key` FOREIGN KEY (`movieId`) REFERENCES `Movies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

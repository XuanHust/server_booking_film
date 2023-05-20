/*
  Warnings:

  - You are about to drop the column `customerId` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `Customers_booking_key`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `Customers_review_key`;

-- AlterTable
ALTER TABLE `bookings` DROP COLUMN `customerId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `reviews` DROP COLUMN `customerId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `customers`;

-- AddForeignKey
ALTER TABLE `Bookings` ADD CONSTRAINT `User_booking_key` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reviews` ADD CONSTRAINT `User_review_key` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

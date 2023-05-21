/*
  Warnings:

  - You are about to drop the column `customerId` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `cateId` on the `tours` table. All the data in the column will be lost.
  - You are about to drop the column `director` on the `tours` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `tours` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `tours` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `tours` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capacity` to the `Tours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Tours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Tours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Tours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tourName` to the `Tours` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `Booking_tours_key`;

-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `Bookings_customer_key`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `Reviews_customer_key`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `Reviews_tour_key`;

-- DropForeignKey
ALTER TABLE `tours` DROP FOREIGN KEY `Categories_key`;

-- AlterTable
ALTER TABLE `bookings` DROP COLUMN `customerId`,
    ADD COLUMN `status` ENUM('WATING', 'ACCEPTED', 'CANCELED') NOT NULL DEFAULT 'WATING',
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `bookingDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `reviews` DROP COLUMN `customerId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tours` DROP COLUMN `cateId`,
    DROP COLUMN `director`,
    DROP COLUMN `genre`,
    DROP COLUMN `name`,
    DROP COLUMN `title`,
    ADD COLUMN `capacity` INTEGER NOT NULL,
    ADD COLUMN `description` LONGTEXT NOT NULL,
    ADD COLUMN `endDate` DATETIME(3) NOT NULL,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL,
    ADD COLUMN `tourName` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `categories`;

-- DropTable
DROP TABLE `customers`;

-- AddForeignKey
ALTER TABLE `Bookings` ADD CONSTRAINT `Bookings_tours_key` FOREIGN KEY (`tourId`) REFERENCES `Tours`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookings` ADD CONSTRAINT `Bookings_user_key` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reviews` ADD CONSTRAINT `Reviews_tours_key` FOREIGN KEY (`tourId`) REFERENCES `Tours`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reviews` ADD CONSTRAINT `Reviews_user_key` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `startTime` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `tours` table. All the data in the column will be lost.
  - Added the required column `bookingDate` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Tours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Tours` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bookings` DROP COLUMN `startTime`,
    ADD COLUMN `bookingDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `customers` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `reviews` MODIFY `comment` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tours` DROP COLUMN `duration`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` DECIMAL(65, 30) NOT NULL;

/*
  Warnings:

  - You are about to alter the column `status` on the `bookings` table. The data in that column could be lost. The data in that column will be cast from `Enum("bookings_status")` to `Enum("Bookings_status")`.

*/
-- AlterTable
ALTER TABLE `bookings` ADD COLUMN `totalPrice` DECIMAL(65, 30) NULL,
    MODIFY `status` ENUM('DADAT', 'DAXACNHAN', 'HUYTOUR', 'DAHOANTHANHTOUR') NOT NULL DEFAULT 'DADAT';

-- AlterTable
ALTER TABLE `tours` ADD COLUMN `code` VARCHAR(191) NULL,
    ADD COLUMN `listLocation` LONGTEXT NULL,
    ADD COLUMN `startLocation` VARCHAR(191) NULL,
    ADD COLUMN `transport` VARCHAR(191) NULL;

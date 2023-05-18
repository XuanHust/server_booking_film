/*
  Warnings:

  - You are about to drop the column `screening_id` on the `tickets` table. All the data in the column will be lost.
  - Added the required column `screeningId` to the `Tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tickets` DROP COLUMN `screening_id`,
    ADD COLUMN `screeningId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Tickets` ADD CONSTRAINT `Ticket_screening_key` FOREIGN KEY (`screeningId`) REFERENCES `Screenings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

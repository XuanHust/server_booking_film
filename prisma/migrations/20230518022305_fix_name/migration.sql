/*
  Warnings:

  - You are about to drop the column `duaration` on the `movies` table. All the data in the column will be lost.
  - Added the required column `duration` to the `Movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `movies` DROP COLUMN `duaration`,
    ADD COLUMN `duration` INTEGER NOT NULL;

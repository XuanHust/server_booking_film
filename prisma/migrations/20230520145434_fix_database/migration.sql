/*
  Warnings:

  - You are about to alter the column `genre` on the `movies` table. The data in that column could be lost. The data in that column will be cast from `Enum("movies_genre")` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `movies` MODIFY `genre` VARCHAR(191) NOT NULL;

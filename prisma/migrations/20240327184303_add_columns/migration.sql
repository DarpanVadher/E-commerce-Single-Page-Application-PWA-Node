/*
  Warnings:

  - Added the required column `billingAddress` to the `Shipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipingAddress` to the `Shipments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `shipments` ADD COLUMN `billingAddress` VARCHAR(191) NOT NULL,
    ADD COLUMN `shipingAddress` VARCHAR(191) NOT NULL;

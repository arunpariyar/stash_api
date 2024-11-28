/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Pot` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pot" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "createAt";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt";

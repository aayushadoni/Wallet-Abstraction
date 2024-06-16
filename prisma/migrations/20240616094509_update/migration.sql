/*
  Warnings:

  - You are about to drop the column `password` on the `UserEmail` table. All the data in the column will be lost.
  - You are about to drop the column `walletData` on the `UserEmail` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "UserEmail_walletData_key";

-- AlterTable
ALTER TABLE "UserEOA" ALTER COLUMN "smartWalletAddress" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserEmail" DROP COLUMN "password",
DROP COLUMN "walletData";

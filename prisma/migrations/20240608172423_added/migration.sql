/*
  Warnings:

  - You are about to drop the column `localWallet` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[walletData]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_localWallet_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "localWallet",
ADD COLUMN     "walletData" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_walletData_key" ON "User"("walletData");

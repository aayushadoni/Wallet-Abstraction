/*
  Warnings:

  - The `walletData` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "walletData",
ADD COLUMN     "walletData" JSONB;

-- CreateIndex
CREATE UNIQUE INDEX "User_walletData_key" ON "User"("walletData");

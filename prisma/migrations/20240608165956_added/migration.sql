/*
  Warnings:

  - A unique constraint covering the columns `[localWallet]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "localWallet" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_localWallet_key" ON "User"("localWallet");

/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "UserEmail" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "walletData" TEXT NOT NULL,
    "smartWalletAddress" TEXT NOT NULL,
    "transaction_no" INTEGER NOT NULL,

    CONSTRAINT "UserEmail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserEOA" (
    "id" SERIAL NOT NULL,
    "eoaAddress" TEXT NOT NULL,
    "smartWalletAddress" TEXT NOT NULL,
    "transaction_no" INTEGER NOT NULL,

    CONSTRAINT "UserEOA_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserEmail_email_key" ON "UserEmail"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserEmail_walletData_key" ON "UserEmail"("walletData");

-- CreateIndex
CREATE UNIQUE INDEX "UserEmail_smartWalletAddress_key" ON "UserEmail"("smartWalletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "UserEOA_eoaAddress_key" ON "UserEOA"("eoaAddress");

-- CreateIndex
CREATE UNIQUE INDEX "UserEOA_smartWalletAddress_key" ON "UserEOA"("smartWalletAddress");

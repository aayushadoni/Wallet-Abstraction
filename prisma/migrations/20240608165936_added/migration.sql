/*
  Warnings:

  - Changed the type of `transaction_no` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL,
DROP COLUMN "transaction_no",
ADD COLUMN     "transaction_no" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_transaction_no_key" ON "User"("transaction_no");

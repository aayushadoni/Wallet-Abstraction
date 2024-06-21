-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "UserEOATransaction";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "UserEmailTransaction";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "userEOAId" INTEGER,
ADD COLUMN     "userEmailId" INTEGER,
ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "userEmailId" ON "Transaction"("userEmailId");

-- CreateIndex
CREATE INDEX "userEOAId" ON "Transaction"("userEOAId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userEmailId_fkey" FOREIGN KEY ("userEmailId") REFERENCES "UserEmail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userEOAId_fkey" FOREIGN KEY ("userEOAId") REFERENCES "UserEOA"("id") ON DELETE SET NULL ON UPDATE CASCADE;

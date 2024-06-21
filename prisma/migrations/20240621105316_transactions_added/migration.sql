-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "UserEOATransaction";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "UserEmailTransaction";

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "UserEmailTransaction" FOREIGN KEY ("transactionHash") REFERENCES "UserEmail"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "UserEOATransaction" FOREIGN KEY ("transactionHash") REFERENCES "UserEOA"("eoaAddress") ON DELETE RESTRICT ON UPDATE CASCADE;

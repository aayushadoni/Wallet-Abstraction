-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('success', 'reverted');

-- CreateTable
CREATE TABLE "Transaction" (
    "transactionHash" TEXT NOT NULL,
    "blockNumber" BIGINT NOT NULL,
    "from" TEXT NOT NULL,
    "gasUsed" BIGINT NOT NULL,
    "status" "TransactionStatus" NOT NULL,
    "to" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transactionHash")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "UserEmailTransaction" FOREIGN KEY ("from") REFERENCES "UserEmail"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "UserEOATransaction" FOREIGN KEY ("from") REFERENCES "UserEOA"("eoaAddress") ON DELETE RESTRICT ON UPDATE CASCADE;

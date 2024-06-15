-- CreateTable
CREATE TABLE "Friend" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "transaction_no" INTEGER NOT NULL,
    "userEmailId" INTEGER,
    "userEOAId" INTEGER,

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_userEmailId_fkey" FOREIGN KEY ("userEmailId") REFERENCES "UserEmail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_userEOAId_fkey" FOREIGN KEY ("userEOAId") REFERENCES "UserEOA"("id") ON DELETE SET NULL ON UPDATE CASCADE;

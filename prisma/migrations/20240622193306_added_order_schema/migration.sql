-- CreateTable
CREATE TABLE "Order" (
    "orderHash" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "userAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "token" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "buy" BOOLEAN NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("orderHash")
);

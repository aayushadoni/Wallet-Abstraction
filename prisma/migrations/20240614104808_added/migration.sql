/*
  Warnings:

  - A unique constraint covering the columns `[name,address,userEmailId]` on the table `Friend` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,address,userEOAId]` on the table `Friend` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Friend_name_address_userEmailId_key" ON "Friend"("name", "address", "userEmailId");

-- CreateIndex
CREATE UNIQUE INDEX "Friend_name_address_userEOAId_key" ON "Friend"("name", "address", "userEOAId");

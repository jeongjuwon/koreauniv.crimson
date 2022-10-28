/*
  Warnings:

  - A unique constraint covering the columns `[clubId,userId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Profile_clubId_userId_key" ON "Profile"("clubId", "userId");

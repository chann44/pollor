/*
  Warnings:

  - You are about to drop the column `followerId` on the `Catagory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Catagory" DROP CONSTRAINT "Catagory_followerId_fkey";

-- AlterTable
ALTER TABLE "Catagory" DROP COLUMN "followerId";

-- CreateTable
CREATE TABLE "Follows" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "catagoryId" INTEGER NOT NULL,

    CONSTRAINT "Follows_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Follows_userId_key" ON "Follows"("userId");

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_catagoryId_fkey" FOREIGN KEY ("catagoryId") REFERENCES "Catagory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

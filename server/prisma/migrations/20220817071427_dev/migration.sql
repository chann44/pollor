/*
  Warnings:

  - The primary key for the `Follows` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Follows` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Option` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Follows_userId_key";

-- AlterTable
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Follows_pkey" PRIMARY KEY ("userId", "catagoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Option_id_key" ON "Option"("id");

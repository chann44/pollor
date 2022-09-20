/*
  Warnings:

  - You are about to drop the column `voted` on the `Poll` table. All the data in the column will be lost.
  - Added the required column `optionId` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Poll" DROP COLUMN "voted";

-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "optionId" INTEGER NOT NULL,
ADD COLUMN     "voted" BOOLEAN DEFAULT false;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

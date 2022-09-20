-- CreateTable
CREATE TABLE "Vote" (
    "pollId" INTEGER NOT NULL,
    "voterId" INTEGER NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("pollId","voterId")
);

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

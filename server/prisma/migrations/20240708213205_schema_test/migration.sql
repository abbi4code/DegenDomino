/*
  Warnings:

  - Added the required column `gameid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "gameid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_gameid_fkey" FOREIGN KEY ("gameid") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

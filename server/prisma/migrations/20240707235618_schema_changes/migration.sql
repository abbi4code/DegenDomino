/*
  Warnings:

  - You are about to drop the column `userid` on the `Game` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_userid_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "userid";

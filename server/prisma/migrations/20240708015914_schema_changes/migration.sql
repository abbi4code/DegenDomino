/*
  Warnings:

  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_adminid_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Admin_id_seq";

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "adminid" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_adminid_fkey" FOREIGN KEY ("adminid") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

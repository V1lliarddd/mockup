/*
  Warnings:

  - You are about to drop the column `icon` on the `Skills` table. All the data in the column will be lost.
  - You are about to drop the column `img` on the `Skills` table. All the data in the column will be lost.
  - Added the required column `icon_src` to the `Skills` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Skills" DROP COLUMN "icon",
DROP COLUMN "img",
ADD COLUMN     "icon_src" TEXT NOT NULL;

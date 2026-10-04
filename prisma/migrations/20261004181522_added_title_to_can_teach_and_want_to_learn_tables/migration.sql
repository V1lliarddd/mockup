/*
  Warnings:

  - Added the required column `title` to the `UserCanTeach` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `UserWantsToLearn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserCanTeach" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserWantsToLearn" ADD COLUMN     "title" TEXT NOT NULL;

/*
  Warnings:

  - You are about to drop the column `offered_skill_id` on the `Exchange` table. All the data in the column will be lost.
  - You are about to drop the column `requested_skill_id` on the `Exchange` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exchange" DROP CONSTRAINT "Exchange_offered_skill_id_fkey";

-- DropForeignKey
ALTER TABLE "Exchange" DROP CONSTRAINT "Exchange_requested_skill_id_fkey";

-- AlterTable
ALTER TABLE "Exchange" DROP COLUMN "offered_skill_id",
DROP COLUMN "requested_skill_id";

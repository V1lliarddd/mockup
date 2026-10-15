/*
  Warnings:

  - The primary key for the `UserCanTeach` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `title` on the `UserWantsToLearn` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,subskill_id]` on the table `UserCanTeach` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ExchangeStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_city_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_gender_id_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "image_path" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserCanTeach" DROP CONSTRAINT "UserCanTeach_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "image_1" TEXT,
ADD COLUMN     "image_2" TEXT,
ADD COLUMN     "image_3" TEXT,
ADD COLUMN     "image_4" TEXT,
ADD CONSTRAINT "UserCanTeach_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserWantsToLearn" DROP COLUMN "title";

-- CreateTable
CREATE TABLE "Exchange" (
    "id" SERIAL NOT NULL,
    "status" "ExchangeStatus" NOT NULL DEFAULT 'PENDING',
    "initiator_id" INTEGER NOT NULL,
    "receiver_id" INTEGER NOT NULL,
    "offered_skill_id" INTEGER NOT NULL,
    "requested_skill_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exchange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "liker_id" INTEGER NOT NULL,
    "liked_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_liker_id_liked_id_key" ON "Like"("liker_id", "liked_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserCanTeach_user_id_subskill_id_key" ON "UserCanTeach"("user_id", "subskill_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_gender_id_fkey" FOREIGN KEY ("gender_id") REFERENCES "Genders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "Cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_initiator_id_fkey" FOREIGN KEY ("initiator_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_offered_skill_id_fkey" FOREIGN KEY ("offered_skill_id") REFERENCES "Subskills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_requested_skill_id_fkey" FOREIGN KEY ("requested_skill_id") REFERENCES "Subskills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_liker_id_fkey" FOREIGN KEY ("liker_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_liked_id_fkey" FOREIGN KEY ("liked_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

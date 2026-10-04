/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `refreshToken` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refreshToken" TEXT NOT NULL,
ALTER COLUMN "creation_date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "likes_count" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

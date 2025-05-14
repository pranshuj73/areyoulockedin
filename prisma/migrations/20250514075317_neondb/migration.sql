/*
  Warnings:

  - A unique constraint covering the columns `[userId,timestamp,language]` on the table `TimeEntry` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `TimeEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TimeEntry" DROP CONSTRAINT "TimeEntry_sessionKey_fkey";

-- AlterTable
ALTER TABLE "TimeEntry" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "banned" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "profilePictureUrl" TEXT,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "TimeEntry_userId_timestamp_idx" ON "TimeEntry"("userId", "timestamp");

-- CreateIndex
CREATE INDEX "TimeEntry_sessionKey_idx" ON "TimeEntry"("sessionKey");

-- CreateIndex
CREATE UNIQUE INDEX "TimeEntry_userId_timestamp_language_key" ON "TimeEntry"("userId", "timestamp", "language");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_sessionKey_idx" ON "User"("sessionKey");

-- AddForeignKey
ALTER TABLE "TimeEntry" ADD CONSTRAINT "TimeEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

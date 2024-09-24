/*
  Warnings:

  - A unique constraint covering the columns `[tsid]` on the table `user_profile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user_profile" ALTER COLUMN "tsid" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_tsid_key" ON "user_profile"("tsid");

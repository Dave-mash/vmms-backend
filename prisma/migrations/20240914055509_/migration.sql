/*
  Warnings:

  - A unique constraint covering the columns `[tsid]` on the table `organisation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "organisation" ALTER COLUMN "tsid" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "organisation_tsid_key" ON "organisation"("tsid");

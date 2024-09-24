/*
  Warnings:

  - A unique constraint covering the columns `[link_organisation]` on the table `subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "subscription" ALTER COLUMN "link_organisation" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "subscription_link_organisation_key" ON "subscription"("link_organisation");

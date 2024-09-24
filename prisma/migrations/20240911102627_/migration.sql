/*
  Warnings:

  - You are about to drop the column `link_user` on the `subscription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[link_user]` on the table `user_role` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "subscription" DROP COLUMN "link_user",
ADD COLUMN     "link_organisation" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "user_role" ALTER COLUMN "link_user" DROP DEFAULT;

-- CreateTable
CREATE TABLE "organisation" (
    "id" SERIAL NOT NULL,
    "tsid" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL DEFAULT '',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organisation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_role_link_user_key" ON "user_role"("link_user");

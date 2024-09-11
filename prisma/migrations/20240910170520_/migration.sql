/*
  Warnings:

  - You are about to drop the column `email` on the `user_profile` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `user_profile` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `user_profile` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user_profile_email_key";

-- DropIndex
DROP INDEX "user_profile_password_key";

-- DropIndex
DROP INDEX "user_profile_phone_key";

-- AlterTable
ALTER TABLE "user_profile" DROP COLUMN "email",
DROP COLUMN "password",
DROP COLUMN "phone",
ALTER COLUMN "is_email_verified" SET DEFAULT false;

-- CreateTable
CREATE TABLE "subscription" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tsid" TEXT NOT NULL DEFAULT '',
    "subscription_type" TEXT NOT NULL DEFAULT '',
    "link_user" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tsid" TEXT NOT NULL DEFAULT '',
    "role_type" TEXT NOT NULL DEFAULT '',
    "link_user" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subscription_uuid_key" ON "subscription"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_uuid_key" ON "user_roles"("uuid");

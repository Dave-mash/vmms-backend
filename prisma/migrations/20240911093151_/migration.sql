/*
  Warnings:

  - You are about to drop the column `uuid` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `user_profile` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `user_roles` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "subscription_uuid_key";

-- DropIndex
DROP INDEX "user_profile_uuid_key";

-- DropIndex
DROP INDEX "user_roles_uuid_key";

-- AlterTable
ALTER TABLE "subscription" DROP COLUMN "uuid";

-- AlterTable
ALTER TABLE "user_profile" DROP COLUMN "uuid";

-- AlterTable
ALTER TABLE "user_roles" DROP COLUMN "uuid";

-- DropIndex
DROP INDEX "user_profile_phone_key";

-- AlterTable
ALTER TABLE "user_profile" ALTER COLUMN "phone" SET DEFAULT '';

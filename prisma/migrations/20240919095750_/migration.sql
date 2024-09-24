/*
  Warnings:

  - A unique constraint covering the columns `[tsid]` on the table `instance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tsid]` on the table `payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tsid]` on the table `subscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tsid]` on the table `user_role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tsid]` on the table `vm_audit_log` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "instance" ALTER COLUMN "tsid" DROP DEFAULT;

-- AlterTable
ALTER TABLE "payment" ALTER COLUMN "tsid" DROP DEFAULT;

-- AlterTable
ALTER TABLE "subscription" ALTER COLUMN "tsid" DROP DEFAULT;

-- AlterTable
ALTER TABLE "user_role" ALTER COLUMN "tsid" DROP DEFAULT;

-- AlterTable
ALTER TABLE "vm_audit_log" ALTER COLUMN "tsid" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "instance_tsid_key" ON "instance"("tsid");

-- CreateIndex
CREATE UNIQUE INDEX "payment_tsid_key" ON "payment"("tsid");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_tsid_key" ON "subscription"("tsid");

-- CreateIndex
CREATE UNIQUE INDEX "user_role_tsid_key" ON "user_role"("tsid");

-- CreateIndex
CREATE UNIQUE INDEX "vm_audit_log_tsid_key" ON "vm_audit_log"("tsid");

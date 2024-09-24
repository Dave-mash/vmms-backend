/*
  Warnings:

  - You are about to drop the column `link_user` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `narration` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `receiver_account_full_name` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `receiver_account_no` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `receiver_bank_code` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `sender_account_no` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `sender_name` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_ref_no` on the `payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "payment" DROP COLUMN "link_user",
DROP COLUMN "narration",
DROP COLUMN "receiver_account_full_name",
DROP COLUMN "receiver_account_no",
DROP COLUMN "receiver_bank_code",
DROP COLUMN "sender_account_no",
DROP COLUMN "sender_name",
DROP COLUMN "transaction_ref_no",
ADD COLUMN     "account_no" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "amount" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "payment_mode" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "transaction_id" TEXT NOT NULL DEFAULT '';

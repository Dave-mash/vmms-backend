/*
  Warnings:

  - You are about to drop the column `transaction_id` on the `payment` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "payment_transaction_id_key";

-- AlterTable
ALTER TABLE "payment" DROP COLUMN "transaction_id",
ADD COLUMN     "transaction_ref_no" TEXT NOT NULL DEFAULT '';

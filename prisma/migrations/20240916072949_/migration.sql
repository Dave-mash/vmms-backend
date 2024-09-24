/*
  Warnings:

  - A unique constraint covering the columns `[transaction_id]` on the table `payment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "payment" ALTER COLUMN "transaction_id" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "payment_transaction_id_key" ON "payment"("transaction_id");

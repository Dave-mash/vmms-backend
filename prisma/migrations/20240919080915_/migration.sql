/*
  Warnings:

  - A unique constraint covering the columns `[password]` on the table `user_profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `user_profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_profile" ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_password_key" ON "user_profile"("password");

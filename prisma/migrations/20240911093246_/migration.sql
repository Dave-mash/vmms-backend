/*
  Warnings:

  - You are about to drop the `user_roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "user_roles";

-- CreateTable
CREATE TABLE "user_role" (
    "id" SERIAL NOT NULL,
    "tsid" TEXT NOT NULL DEFAULT '',
    "role_type" TEXT NOT NULL DEFAULT '',
    "link_user" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_role_pkey" PRIMARY KEY ("id")
);

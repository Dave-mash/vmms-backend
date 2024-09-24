-- AlterTable
ALTER TABLE "user_role" ADD COLUMN     "link_organisation" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "instance" (
    "id" SERIAL NOT NULL,
    "tsid" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL DEFAULT '',
    "vm_id" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT '',
    "image_name" TEXT NOT NULL DEFAULT '',
    "private_ip" TEXT NOT NULL DEFAULT '',
    "public_ip" TEXT NOT NULL DEFAULT '',
    "mac_address" TEXT NOT NULL DEFAULT '',
    "storage_type" TEXT NOT NULL DEFAULT '',
    "storage_size" TEXT NOT NULL DEFAULT '',
    "link_organisation" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "instance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "instance_vm_id_key" ON "instance"("vm_id");
